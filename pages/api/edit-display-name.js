import { getDB } from '../../lib/db';
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    async function handler(req, res) {
        if (req.method === 'POST') {
            if (!req?.session?.user?.id) {
                // Return an error response if the user is not authenticated
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            // Extract the user's new display name from the request body
            const displayName = req.body;
            console.log(req.body);

            // Validate the display name (e.g., check length, characters allowed)
            if (!/^[\w ]+$/g.test(displayName)) {
                // Return an error response if validation fails
                res.status(400).json({ message: 'Display name can only contain English letters, numbers and spaces' });
                return;
            }

            const db = getDB();

            const result = await new Promise((resolve, reject) => {
                db.run('UPDATE users SET display_name = ? WHERE id = ?;', [displayName, req.session.user.id], function(error) {
                    if (error) {
                        resolve({ status: 500, message: error.message });
                    } else {
                        resolve({ status: 200, message: 'Display name updated successfully' });
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
