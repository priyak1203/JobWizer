import { useLoaderData } from 'react-router-dom';
import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';

export const loader = async () => {
  const response = await customFetch.get('/jobs/statss');
  return response.data;

  // try {
  //   const response = await customFetch.get('/jobs/statss');
  //   return response.data;
  // } catch (error) {
  //   return error;
  // }
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
