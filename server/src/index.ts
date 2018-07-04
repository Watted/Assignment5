import * as http from 'http';
import socket from './socket.io';
import app from './app';

const httpServer = http.createServer(app);
socket(httpServer);

httpServer.listen(4000, () =>console.log('Server Listening on port 4000!'));