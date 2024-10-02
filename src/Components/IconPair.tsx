import { FC, memo } from 'react';
import styled from 'styled-components';

interface IconPairProps {
  type: string;
  value: string;
}

interface IconType {
  type: string;
}

const IconDiv = styled.div<IconType>`
  background-image: ${(props) => `url('src/assets/${props.type}.png')`};
  width: 20px;
  height: 20px;
  background-size: cover;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  font-size: 20px;
  margin-top: 22px;
`;

const ValueDiv = styled.div`
  margin-left: 10px;
  color: white;
`;

const IconPair: FC<IconPairProps> = memo(({ type, value }) => {
  return (
    <Container>
      <IconDiv type={type} />
      <ValueDiv>{value}</ValueDiv>
    </Container>
  );
});

export default IconPair;
