import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer } from 'ws';
import * as dotenv from 'dotenv';

dotenv.config();


let HTTP_PORT = process.env.HTTP_PORT ?? 8181;
let WS_PORT = process.env.WS_PORT ?? 3000;

export const httpServer = http.createServer(function (req, res) {

  const __dirname = path.resolve(path.dirname(''));
  const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      console.log('readFile err', err);
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', function (wsSoket) {
  console.log('new connection',wsSoket);

  wsSoket.on('message',(msg)=>{
    console.log('message',JSON.parse(msg,null,4));
  });

  wsSoket.on('close',()=>{
    console.log('close');
  });


});

