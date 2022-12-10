import { Space } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InfoContainer = styled.div`
  display: flex;
  margin-bottom: 26px;
  flex-direction: column;
`;

export const BoardContainer = styled.div`
  display: flex;
  width: 375px;
  height: 375px;
  flex-wrap: wrap;
  & > * {
    flex: 1 1 100px;
  }
`;

export const Buttons = styled(Space)`
  display: flex;
  flex-direction: row;
`;
