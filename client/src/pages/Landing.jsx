import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <section className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
            quae veniam ipsam aperiam nostrum dolore consequatur. Autem aliquam
            inventore voluptatibus id, ad, accusantium similique earum molestias
            velit quisquam.
          </p>
          <Link to="/register" className="btn register-link">
            register
          </Link>
          <Link to="/login" className="btn">
            login / demo user
          </Link>
        </div>
        <img src={main} alt="job tracker app" className="img main-img" />
      </section>
    </Wrapper>
  );
};

export default Landing;
