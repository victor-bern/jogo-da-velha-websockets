import { Input, Modal } from 'antd';
import { useState } from 'react';

type JoinRoomModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  handleOkModal: (roomId: string, username: string) => void;
  roomIdSelected?: string | '';
};

const JoinRoomModal: React.FC<JoinRoomModalProps> = ({
  modalIsOpen,
  closeModal,
  handleOkModal,
  roomIdSelected,
}) => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  return (
    <>
      <Modal
        title='Join Room'
        centered
        open={modalIsOpen}
        onOk={() => handleOkModal(roomId, username)}
        onCancel={() => closeModal()}
      >
        <Input
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <Input
          value={roomIdSelected ? roomIdSelected : roomId}
          defaultValue={roomIdSelected ? roomIdSelected : roomId}
          onChange={(e) => setRoomId(e.currentTarget.value)}
        />
      </Modal>
    </>
  );
};

export default JoinRoomModal;
