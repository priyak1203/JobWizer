import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet, redirect, useNavigate, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BigSidebar, Loading, Navbar, SmallSidebar } from '../components';
import Wrapper from '../assets/wrappers/Dashboard';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  },
};

export const loader = (queryClient) => async () => {
  // get current user
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect('/');
  }
};

const DashboardContext = createContext();

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const DashboardLayout = ({ queryClient }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [isAuthError, setIsAuthError] = useState(false);

  const { user } = useQuery(userQuery)?.data;
  const navigate = useNavigate();

  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const logoutUser = async () => {
    // remove dark theme from landing page
    document.body.classList.remove('dark-theme');
    navigate('/');
    const {
      data: { msg },
    } = await customFetch.get('/auth/logout');
    // invalidate queries and clear cache
    queryClient.invalidateQueries();
    queryClient.clear();
    toast.success(msg);
  };

  // interceptor to check auth error
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },

    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  // logout the user if there is an auth error
  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleSidebar,
        toggleDarkTheme,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <BigSidebar />
          <SmallSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
