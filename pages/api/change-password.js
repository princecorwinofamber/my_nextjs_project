import { getDB } from '../../lib/db';
import { withIronSessionApiRoute } from "iron-session/next";
const crypto = require("crypto");

export default withIronSessionApiRoute(
    async function handler(req, res) {
        if (req.method === 'POST') {
            if (!req?.session?.user?.id) {
                // Return an error response if the user is not authenticated
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            // Extract the request data name from the request body
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;
            const repeatPassword = req.body.repeatPassword;

            if (newPassword !== repeatPassword) {
                res.status(400).json({ message: 'Passwords do not match' });
                return;
            }

            // Validate the password (e.g., check length, characters allowed)
            if (newPassword.length > 100) {
                res.status(400).json({ message: 'Password is too long' });
                return;
            }
            if (newPassword.length < 6) {
                res.status(400).json({ message: 'Password is too short' });
                return;
            }

            const db = getDB();
            const user = await new Promise((resolve, reject) => {
                db.get('SELECT * FROM users WHERE id=?', [req?.session?.user?.id], (err, row) => {
                    resolve(row);
                })
            });

            const passwordHash = crypto.createHash('sha256').update(`${user.username}:${oldPassword}:${user.salt}`).digest('hex');

            if (passwordHash != user.password_hash) {
                res.status(400).send({ message: "Invalid current password" });
                return;
            }

            const newPasswordHash = crypto.createHash('sha256').update(`${user.username}:${newPassword}:${user.salt}`).digest('hex');

            const result = await new Promise((resolve, reject) => {
                db.run('UPDATE users SET password_hash = ? WHERE id = ?;', [newPasswordHash, req.session.user.id], function(error) {
                    if (error) {
                        resolve({ status: 500, message: error.message });
                    } else {
                        resolve({ status: 200, message: 'Password updated successfully' });
                    }
                })
            });
            res.status(result.status).json({ message: result.message });
        } else {
            // Return an error response for unsupported HTTP methods
            res.status(405).json({ message: 'Method Not Allowed' });
        }
    },
    {
        cookieName: process.env.IRON_SESSION_COOKIE_NAME,
        password: process.env.COOKIE_ENCRYTPION_PASSWORD,
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        }
    }
);
