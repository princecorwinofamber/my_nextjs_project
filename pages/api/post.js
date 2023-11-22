import { getDB, postToThread } from "../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method Not Allowed' });
      return;
    }
    const user_id = req?.session?.user?.id;
    if (!user_id) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const db = getDB();
    console.log('Post', req.query);
    if (req.query.thread_id) {
      postToThread(req.query.thread_id, user_id, req.body);
      res.status(200).json({ text: 'Post Sucessful!' });
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
