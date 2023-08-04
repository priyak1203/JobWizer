import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterLoginPage';
import { FormRow, Logo } from '../components';

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="last name" />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button className="btn btn-block" type="submit">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
