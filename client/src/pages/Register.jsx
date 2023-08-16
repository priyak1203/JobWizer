import { Form, Link, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    return redirect('/login');
  } catch (error) {
    console.log(error);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
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
      </Form>
    </Wrapper>
  );
};
export default Register;
