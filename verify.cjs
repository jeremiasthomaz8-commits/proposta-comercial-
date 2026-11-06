const fs = require('fs');
const html = fs.readFileSync('dist/index.html','utf8');
if ((html.match(/<section /g)||[]).length !== 4) throw Error('section count');
for (const m of html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)) if (!fs.existsSync('dist/'+m[1])) throw Error(m[1]);
for (const m of fs.readFileSync('dist/styles.css','utf8').matchAll(/url\('([^']+)'\)/g)) if (!fs.existsSync('dist/'+m[1])) throw Error(m[1]);
console.log('OK: 4 sections and all local assets');
