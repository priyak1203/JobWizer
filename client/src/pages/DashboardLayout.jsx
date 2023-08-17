import { createContext, useContext, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import Wrapper from '../assets/wrappers/Dashboard';

export const loader = () => {
  return 'hello world';
};

const DashboardContext = createContext();

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const data = useLoaderData();
  console.log(data);
  // temp
  const user = { name: 'priya' };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const logoutUser = () => {
    console.log('logout user');
  };

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
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
