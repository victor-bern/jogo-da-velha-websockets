import { SquareContainer, Value } from './styles';

type SquareProps = {
  value: string;
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <SquareContainer onClick={onClick}>
      <Value>{value}</Value>
    </SquareContainer>
  );
};
export default Square;
