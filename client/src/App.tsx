import { io } from 'socket.io-client';
import Board from './components/Board/Index';
import Chat from './components/Chat/Index';
import { AppContainer } from './components/styles';

const App: React.FC = () => {
  const socket = io('http://localhost:3001');
  return (
    <AppContainer>
      <Board socket={socket} />
      <Chat socket={socket} />
    </AppContainer>
  );
};

export default App;
