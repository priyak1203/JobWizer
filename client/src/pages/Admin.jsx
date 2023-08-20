import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { StatItem } from '../components';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/admin/app-stats');
    return data;
  } catch (error) {
    toast.error('you are not authorized to view this page');
    return redirect('/dashboard');
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <Wrapper cols={2}>
      <StatItem
        title="current users"
        count={users}
        icon={<FaSuitcaseRolling />}
        color="#e9b949"
        bcg="#fcefc7"
      />
      <StatItem
        title="total jobs"
        count={jobs}
        icon={<FaCalendarCheck />}
        color="#647acb"
        bcg="#e0e8f9"
      />
    </Wrapper>
  );
};

export default Admin;
