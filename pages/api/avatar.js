const fs = require('fs');

export default function handler(req, res) {
  console.log("Avatar API requested");
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
    return;
  }
  console.log(req.query.user);
  var s = fs.createReadStream(`avatars/${req.query.user}.png`);
  s.on('open', function () {
    res.setHeader('Content-Type', 'image/png');
    // res.setHeader('Content-Security-Policy', `script-src 'none'; sandbox;`);
    s.pipe(res);
  });
  s.on('error', function () {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404;
    res.end('Not found');
  });
}

console.log("Avatar API executed");
