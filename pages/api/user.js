// pages/api/user.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { getDB } from "../../lib/db";

export default withIronSessionApiRoute(
  async function userRoute(req, res) {
    const db = getDB();
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id=?', [req.session.user.id], (err, row) => {
        resolve(row);
      })
    });

    if (!user) {
      res.status(404).send({ success: false, id: 0, username: null, display_name: null, signup_date: null });
      return;
    }

    const { password_hash, salt, is_auth_token_deactivated, ...nonSecretUserData } = user || {};
    console.log("user api called for", nonSecretUserData?.username || "no user", nonSecretUserData?.display_name);
    res.send({ user: nonSecretUserData });
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
