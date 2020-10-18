import React, { useEffect, useState } from 'react';
import { Content } from './components/layout/Content';
import Header from './components/layout/Header';
import {
  getProjectsFromDb,
  getTasksFromDb,
} from './contextAPI/actions';
import { useStateValue } from './contextAPI/StateProvider';

const App = ({ darkModeDefault = false }) => {
  const [{ selectedProject }, dispatch] = useStateValue();

  const [darkMode, setDarkMode] = useState(darkModeDefault);

  const user = {
    id: 'ftg34v',
  };
  useEffect(() => {
    const loadData = async () => {
      getProjectsFromDb(user.id, dispatch);
      getTasksFromDb(user.id, selectedProject, dispatch);
      // auth
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

export default App;
