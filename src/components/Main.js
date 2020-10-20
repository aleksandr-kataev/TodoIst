import React, { useEffect, useState } from 'react';
import { Content } from './layout/Content';
import Header from './layout/Header';
import {
  getProjectsFromDb,
  getTasksFromDb,
} from '../contextAPI/actions';
import { useStateValue } from '../contextAPI/StateProvider';

const Main = ({ darkModeDefault = false }) => {
  const [{ selectedProject, user }, dispatch] = useStateValue();
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  useEffect(() => {
    const loadData = async () => {
      getProjectsFromDb(user.id, dispatch);
      getTasksFromDb(user.id, selectedProject, dispatch);
    };
    loadData();
  }, []);

  return (
    <main
      data-testid='application'
      className={darkMode ? 'darkmode' : undefined}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Content />
    </main>
  );
};

export default Main;
