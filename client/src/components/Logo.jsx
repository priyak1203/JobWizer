import { styled } from 'styled-components';

const Logo = () => {
  return (
    <Wrapper className="logo">
      Job
      <span>Wizer</span>
    </Wrapper>
  );
};

export default Logo;

const Wrapper = styled.h3`
  margin-bottom: 0;
  text-align: center;
  color: var(--grey-800);
  span {
    color: var(--primary-500);
  }
  font-weight: 700;
`;
