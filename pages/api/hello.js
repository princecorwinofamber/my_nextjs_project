export default function handler(req, res) {
  res.status(200).json({ text: 'Hello, world!' });
}

console.log("Hello API executed");
