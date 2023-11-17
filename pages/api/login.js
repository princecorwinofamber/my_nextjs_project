import { getDB } from "../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";
const crypto = require("crypto");

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    console.log("iron session login", req.session, req.body);
    
    const db = getDB();
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username=?', [req.body.username], (err, row) => {
        resolve(row);
      })
    });

    if (!user) {
      res.status(404).send({ success: false, reason: "User not found" });
      return;
    }
    
    const passwordHash = crypto.createHash('sha256').update(`${req.body.username}:${req.body.password}:${user.salt}`).digest('hex');

    if (passwordHash != user.password_hash) {
      console.log("For user", user.username, "expected password", user.password_hash, "got password", passwordHash);
      res.status(400).send({ success: false, reason: "Invalid password" });
      return;
    }
    // get user from database then:
    req.session.user = user;
    req.session.user.admin = true;

    await req.session.save();
    res.send({ success: true });
  },
  {
    cookieName: process.env.IRON_SESSION_COOKIE_NAME,
    password: process.env.COOKIE_ENCRYTPION_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);
