import { useLoaderData } from 'react-router-dom';
import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

export const loader = async () => {
  // const response = await customFetch.get('/jobs/stats');
  // return response.data;
  // try {
  //   const response = await customFetch.get('/jobs/statss');
  //   return response.data;
  // } catch (error) {
  //   return error;
  // }

  return null;
};

const Stats = () => {
  // const { defaultStats, monthlyApplications } = useLoaderData();

  // traditional react query setup
  const response = useQuery({
    queryKey: ['stats'],
    queryFn: () => customFetch.get('/jobs/stats'),
  });

  const { isLoading, isError, data } = response;

  if (isLoading) return <h4>Loading....</h4>;

  if (isError) return <h4>Error...</h4>;

  const { monthlyApplications, defaultStats } = data.data;

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
