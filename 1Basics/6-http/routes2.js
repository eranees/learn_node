const http = require('http');

const server = http.createServer((req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'text/json' })
    console.log('Received body:', body);
    res.end(body);
  });
});

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});
