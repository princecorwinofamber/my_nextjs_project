import { getDB, postToThread } from "../../lib/db";

export default function handler(req, res) {
  const db = getDB();
  console.log('Post', req.query);
  if (req.query.postText && req.query.author_id && req.query.thread_id) {
    postToThread(req.query.thread_id, req.query.author_id, req.query.postText);
    res.status(200).json({ text: 'Post Sucessful!' });
  } else {
    res.status(400);
  }
}
