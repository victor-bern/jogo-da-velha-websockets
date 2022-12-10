import { Button, Typography } from 'antd';
import styled from 'styled-components';

export const AvailableRoomsContainer = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  overflow: scroll;
  height: 400px;
  width: 225px;
  border: 1px solid black;
`;

export const Room = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

export const RoomId = styled(Typography.Text)``;
export const JoinRoomButton = styled(Button)``;
