import React, { useEffect } from 'react';
import { Content } from './components/layout/Content';
import Header from './components/layout/Header';
import {
  getProjectsFromDb,
  getTasksFromDb,
} from './contextAPI/actions';
import { useStateValue } from './contextAPI/StateProvider';

const App = () => {
  const [{ selectedProject }, dispatch] = useStateValue();
  const user = {
    id: 'ftg34v',
  };
  useEffect(() => {
    const loadData = async () => {
      const projectsRes = await getProjectsFromDb(user.id);
      dispatch({
        type: 'LOAD_PROJECTS',
        payload: projectsRes,
      });
      const tasksRes = await getTasksFromDb(user.id, selectedProject);
      dispatch({
        type: 'LOAD_TASKS',
        payload: tasksRes,
      });
      // auth
    };

    loadData();
  }, [dispatch]);

  return (
    <div className='app'>
      <Header />
      <Content />
    </div>
  );
};

export default App;
