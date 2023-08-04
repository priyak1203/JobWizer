import { styled } from 'styled-components';

const Wrapper = styled.aside`
  border: 2px solid green;
  display: none;
  @media (min-width: 992px) {
    display: block;
  }
`;

export default Wrapper;
