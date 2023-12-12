import { getDB, createThread } from "../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handler(req, res) {
    const db = getDB();
    const user_id = req?.session?.user?.id;
    if (!user_id) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    console.log('Create Thread', req.query);
    if (req.query.name) {
      const status = await createThread(req.query.name);
      res.status(200).json(status);
    } else {
      res.status(400);
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
