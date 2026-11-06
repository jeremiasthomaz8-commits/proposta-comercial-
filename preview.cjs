const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, 'dist');
http.createServer((req, res) => {
  const relative = decodeURIComponent(req.url.split('?')[0]);
  const file = path.resolve(root, '.' + (relative === '/' ? '/index.html' : relative));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (error, data) => {
    if (error) { res.writeHead(404).end('Não encontrado'); return; }
    const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.ttf':'font/ttf'};
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream'}).end(data);
  });
}).listen(4173, '127.0.0.1', () => console.log('http://127.0.0.1:4173'));
