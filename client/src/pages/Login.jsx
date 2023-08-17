import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // sending data from action
  const errors = { msg: '' };
  if (data.password.length < 5) {
    errors.msg = 'password is too short';
    return errors;
  }

  try {
    await customFetch.post('/auth/login', data);
    toast.success('login successful');
    return redirect('/dashboard');
  } catch (error) {
    // toast.error(error?.response?.data?.msg);
    // return error;
    errors.msg = error?.response?.data?.msg;
    return errors;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const errors = useActionData();
  console.log(errors);

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>login</h4>
        {errors && <p style={{ color: 'red' }}>{errors.msg}</p>}
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <button type="button" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
