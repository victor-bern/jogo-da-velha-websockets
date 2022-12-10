import Express from 'express';
import http from 'http';
import Socket from 'socket.io';
const app = Express();
const server = http.createServer(app);
const io = new Socket.Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('reqTurn', (data) => {
    const room = JSON.parse(data).room;
    socket.to(room).emit('playerTurn', data);
  });

  socket.on('create', (data) => {
    socket.join(data.room);
  });

  socket.on('join', (data) => {
    socket.join(data.room);
  });

  socket.on('updateBoard', (data) => {
    data.board as string[];
    const newPlayer = data.currentPlayer == 'X' ? 'O' : 'X';
    socket.broadcast
      .to(data.room)
      .emit('boardUpdated', { board: data.board, newPlayer });
  });

  socket.on('resetGame', (data) => {
    socket.broadcast
      .to(data.room)
      .emit('restart', { board: Array(9).fill(null) });
  });

  socket.on('sendMessage', (data) => {
    const messages = data.messages as object[];
    messages.push({
      username: data.username,
      content: data.content,
    });
    socket.broadcast.to(data.room).emit('receiveMessage', {
      messages,
    });
  });
});
server.listen(3001, () => {
  console.log('server open on port 3001');
});