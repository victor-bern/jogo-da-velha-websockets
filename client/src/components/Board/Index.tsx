import { Button, notification } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { AppContext } from '../../context/AppContext';
import { getWinner } from '../../services/boardService';
import CreateRoomModal from '../CreateRoomModal/Index';
import JoinRoomModal from '../JoinRoomModal/Index';
import Square from '../Square/Index';
import {
  BoardContainer,
  Buttons,
  Container,
  InfoContainer,
  TurnOfInfo,
  WinnerText,
} from './style';

type BoardProps = {
  socket: Socket;
};

const Board: React.FC<BoardProps> = ({ socket }) => {
  const { board, roomId, updateBoard, saveRoomId, saveUsername } =
    useContext(AppContext);
  const [createRoomModalIsOpen, setCreateRoomModalIsOpen] = useState(false);
  const [joinRoomModalIsOpen, setJoinRoomModalIsOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const winner = getWinner(board);

  const handleClick = (i: number) => {
    const copyBoard = [...board];

    if (winner || copyBoard[i]) {
      notification.open({
        message: `${winner} is the winner`,
      });
      return;
    }

    copyBoard[i] = currentPlayer;
    updateBoard(copyBoard);
    socket.emit('updateBoard', {
      board: copyBoard,
      room: roomId,
      currentPlayer,
    });
  };

  useEffect(() => {
    return () => {
      socket.on('restart', () => {
        updateBoard(Array(9).fill(null));
        setCurrentPlayer('X');
        console.log('AA');
      });

      socket.on('boardUpdated', ({ board, newPlayer }) => {
        updateBoard(board);
        console.log(newPlayer);
        setCurrentPlayer(newPlayer);
      });

      socket.on('opponentJoined', () => {
        (() => {
          notification.open({
            message: 'Opponent Appeared',
          });
        })();
      });

      socket.on('roomCreated', () => {
        console.log('sala criada');
      });
    };
  }, []);

  return (
    <Container>
      {!winner ? <TurnOfInfo>Turn of: {currentPlayer}</TurnOfInfo> : null}
      <InfoContainer>
        <Buttons size={'middle'}>
          <Button type='primary' onClick={() => setCreateRoomModalIsOpen(true)}>
            Create Room
          </Button>
          <Button type='primary' onClick={() => setJoinRoomModalIsOpen(true)}>
            Join Room
          </Button>
          <Button
            type='primary'
            onClick={() => {
              updateBoard(Array(9).fill(null));
              setCurrentPlayer('X');
              socket.emit('resetGame', { room: roomId });
            }}
          >
            Reset Game
          </Button>
        </Buttons>
      </InfoContainer>
      <BoardContainer>
        {board.map((square, i) => (
          <Square key={i} value={square} onClick={() => handleClick(i)} />
        ))}
      </BoardContainer>
      <CreateRoomModal
        modalIsOpen={createRoomModalIsOpen}
        handleOkModal={(randomId, username) => {
          socket.emit('create', {
            room: randomId,
            board,
          });
          saveRoomId(randomId);
          setCreateRoomModalIsOpen(false);
          saveUsername(username);
        }}
        closeModal={() => setCreateRoomModalIsOpen(false)}
      />
      <JoinRoomModal
        modalIsOpen={joinRoomModalIsOpen}
        closeModal={() => setJoinRoomModalIsOpen(false)}
        handleOkModal={(roomId, username) => {
          setJoinRoomModalIsOpen(false);
          socket.emit('join', {
            room: roomId,
            board,
          });
          saveRoomId(roomId);
          saveUsername(username);
        }}
      />
      {winner ? (
        <WinnerText level={3}>The Winner is {winner}</WinnerText>
      ) : null}
    </Container>
  );
};

export default Board;
