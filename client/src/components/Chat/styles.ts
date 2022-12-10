import { Input, Typography } from 'antd';
import styled from 'styled-components';
export const ChatContainer = styled.div`
  position: absolute;
  bottom: 25px;
  right: 25px;
  height: 500px;
  width: 300px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

export const MessagesContainer = styled.div`
  flex: 8;
  overflow: scroll;
`;
export const UserMessage = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
  padding: 8px;
`;

export const MessageUsername = styled(Typography.Text)``;

export const MessageContent = styled(Typography.Text)`
  padding: 16px;
  border-radius: 16px;
  background-color: red;
  opacity: calc(0.2);
  color: white;
`;

export const InputContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputMessage = styled(Input)`
  width: 90%;
  border-radius: 5px;
  padding: 5px;
`;
