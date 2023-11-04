import { getDB } from '../../lib/db';

console.log("Route API executed");

export async function GET(req, res) {
    console.log("API requested");
    const db = getDB();
    const rows = await db.all('SELECT * FROM posts');
    return new Response(JSON.stringify(rows), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    })
}
