import http from 'http';
import socketIo from 'socket.io';

const socketIoSetup = (server: http.Server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('an user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

export default socketIoSetup;
