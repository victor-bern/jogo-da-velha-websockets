import { Button, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { generateRandomId } from '../../services/boardService';
import { IdRoomInputGroup } from './styles';

type CreateRoomModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  handleOkModal: (randomId: string, username: string) => void;
};

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  modalIsOpen,
  closeModal,
  handleOkModal,
}) => {
  const [randomId, setRandomId] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [username, setUsername] = useState('');
  useEffect(() => {
    setRandomId(generateRandomId);
  }, []);
  return (
    <>
      <Modal
        title='Create Room'
        centered
        open={modalIsOpen}
        onOk={() => handleOkModal(randomId, username)}
        onCancel={() => closeModal()}
      >
        <Input
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <IdRoomInputGroup>
          <Input defaultValue={randomId} disabled />
          <Button
            type='primary'
            onClick={(e) => {
              setIsShared(true);
              navigator.clipboard.writeText(randomId);
            }}
          >
            {isShared ? 'Copied' : 'Share'}
          </Button>
        </IdRoomInputGroup>
      </Modal>
    </>
  );
};

export default CreateRoomModal;
