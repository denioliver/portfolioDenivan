import styled from 'styled-components';

const CubeContainer = styled.div`
  perspective: 1000px;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;

const Cube = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 50px auto;
  transform-style: preserve-3d;
  animation: spin 10s infinite linear;
  
  @keyframes spin {
    0% { transform: rotateX(0deg) rotateY(0deg); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
  }
`;

const Face = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  font-weight: bold;
`;

const Front = styled(Face)`
  background: #ff006a;
  transform: rotateY(0deg) translateZ(50px);
`;

const Back = styled(Face)`
  background: #0026ff;
  transform: rotateY(180deg) translateZ(50px);
`;

const Right = styled(Face)`
  background: #00ffff;
  transform: rotateY(90deg) translateZ(50px);
`;

const Left = styled(Face)`
  background: #00ff00;
  transform: rotateY(-90deg) translateZ(50px);
`;

const Top = styled(Face)`
  background: #ffe600;
  transform: rotateX(90deg) translateZ(50px);
`;

const Bottom = styled(Face)`
  background: #ff0000;
  transform: rotateX(-90deg) translateZ(50px);
`;

export const SimpleCube = () => {
  console.log('SimpleCube renderized'); // Debug log

  return (
    <CubeContainer>
      <Cube>
        <Front>F</Front>
        <Back>B</Back>
        <Right>R</Right>
        <Left>L</Left>
        <Top>T</Top>
        <Bottom>Bot</Bottom>
      </Cube>
    </CubeContainer>
  );
};
