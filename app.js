const http = require('http'),
      fs = require('fs'),
      url = require('url'),
      path = require('path'),
      events = require('events');
const messages = ["Tomato", "Steelblue", "Orchid", "PapayaWhip", "Hello, World"]
http.createServer((request, response) => {
  console.log(`${request.method} ${request.url}`);
  const parsedUrl = url.parse(request.url);
  let pathname = `.${parsedUrl.pathname}`;
  const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  };
  fs.exists(pathname, function (exist) {
    if(!exist) {
      response.statusCode = 404;
      response.end(`File ${pathname} not found!`);
      return;
    }
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
    }
    fs.readFile(pathname, function(err, data){
      if(err){
        response.statusCode = 500;
        response.end(`Error getting the file: ${err}.`);
      } else {
        const ext = path.parse(pathname).ext;
        response.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        response.end(data);
      }
    });
  });
}).listen(9000, () => { console.log("Server running on port 9000") })


const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8090 });


server.on('connection', conn => {
  setInterval(() => {
    const randNumber = Math.floor(Math.random() * messages.length);
    server.clients.forEach(client => {
        client.send(messages[randNumber]);
    })
  }, 1000)
})
