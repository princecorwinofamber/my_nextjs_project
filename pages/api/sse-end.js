import { saveIntervalId, removeIntervalId } from "../../lib/sse-common";

export default function handler(req, res) {
  
  res.status(200).json({ text: 'SSE connection terminated' });
}