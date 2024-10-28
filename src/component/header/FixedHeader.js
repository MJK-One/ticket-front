import styled from 'styled-components';

// styled-components: 화면 상단 fixed
const FixedHeader = styled.header`
  background-color: #fff;
  @media (max-width: 1100px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000; /* 다른 요소 위로 헤더가 나타나도록 */
  }
`;
export default FixedHeader;