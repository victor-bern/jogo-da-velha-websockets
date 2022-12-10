import { notification } from 'antd';
import { useContext, useState } from 'react';
import { Socket } from 'socket.io-client';
import { AppContext } from '../../context/AppContext';
import JoinRoomModal from '../JoinRoomModal/Index';
import { AvailableRoomsContainer, JoinRoomButton, Room, RoomId } from './style';

type AvailableRoomsProps = {
  socket: Socket;
};

const AvailableRooms: React.FC<AvailableRoomsProps> = ({ socket }) => {
  const { rooms, saveRoomId, saveUsername, updatePlayer } =
    useContext(AppContext);
  const clientId = localStorage.getItem('clientId');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');

  return (
    <AvailableRoomsContainer>
      {rooms
        .filter((room) => room.owner !== clientId)
        ?.map((room) => (
          <Room>
            <RoomId>{room.roomId}</RoomId>
            <JoinRoomButton
              onClick={() => {
                setSelectedRoom(room.roomId);
                setIsModalOpen(true);
              }}
            >
              Join Room
            </JoinRoomButton>
          </Room>
        ))}

      <JoinRoomModal
        modalIsOpen={isModalOpen}
        roomIdSelected={selectedRoom}
        closeModal={() => setIsModalOpen(false)}
        handleOkModal={(roomid, username) => {
          if (!username) {
            notification.error({
              message: 'Need to insert username',
            });
            return;
          }
          setIsModalOpen(false);
          socket.emit('join', {
            room: selectedRoom,
          });
          saveRoomId(selectedRoom);
          saveUsername(username);
          updatePlayer('O');
        }}
      />
    </AvailableRoomsContainer>
  );
};

export default AvailableRooms;
