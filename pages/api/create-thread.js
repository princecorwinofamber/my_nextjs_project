import { getDB, createThread } from "../../lib/db";

export default function handler(req, res) {
  const db = getDB();
  console.log('Create Thread', req.query);
  if (req.query.name) {
    createThread(req.query.name, () => res.status(200).json({ text: 'Post Sucessful!' }), res.status(500).json({ text: 'Post Unsucessful!' }));
/*    if (createThread(req.query.name)) {
      res.status(200).json({ text: 'Post Sucessful!' });
    } else {
      console.log("Returning with code 500");
      res.status(500).json({ text: 'Post Unsucessful!' });
    } */
  } else {
    res.status(400);
  }
}
