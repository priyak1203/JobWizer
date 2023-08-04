import { styled } from 'styled-components';

const Wrapper = styled.aside`
  border: 2px dashed black;
  @media (min-width: 992px) {
    display: none;
  }
  display: block;
`;

export default Wrapper;
