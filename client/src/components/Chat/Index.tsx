import { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { AppContext } from '../../context/AppContext';
import {
  ChatContainer,
  InputContainer,
  InputMessage,
  MessageContent,
  MessagesContainer,
  MessageUsername,
  UserMessage,
} from './styles';
type ChatProps = {
  socket: Socket;
};
const Chat: React.FC<ChatProps> = ({ socket }) => {
  const { messages, updateMessages, username, roomId } = useContext(AppContext);
  const [message, setMessage] = useState('');
  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      updateMessages(data.messages);
    });
  }, [socket, updateMessages]);
  return (
    <ChatContainer>
      <MessagesContainer>
        {messages?.map((message) => (
          <UserMessage>
            <MessageUsername>{message.username}</MessageUsername>
            <MessageContent>{message.content}</MessageContent>
          </UserMessage>
        ))}
      </MessagesContainer>
      <InputContainer>
        <InputMessage
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && message.length !== 0) {
              setMessage('');
              socket.emit('sendMessage', {
                username,
                content: message,
                room: roomId,
                messages: messages,
              });
              updateMessages([
                ...messages,
                {
                  username,
                  content: message,
                },
              ]);
            }
          }}
        />
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat;
