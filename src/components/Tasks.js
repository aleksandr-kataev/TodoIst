import React, { useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { collatedTasks } from '../constants/index';
import {
  getTitle,
  getCollatedTitle,
  collatedTasksExist,
} from '../util';
import { useStateValue } from '../contextAPI/StateProvider';
import { getTasksFromDb } from '../contextAPI/actions';

const Tasks = () => {
  const [
    { projects, tasks, selectedProject },
    dispatch,
  ] = useStateValue();
  const user = {
    id: 'ftg34v',
  };
  let projectName = '';

  useEffect(() => {
    const setTasks = async () => {
      const res = await getTasksFromDb(user.id, selectedProject);
      dispatch({
        type: 'LOAD_TASKS',
        payload: res,
      });
    };
    setTasks();
  }, [selectedProject]);

  //maybe you dont need tasks state at all just load when selectyed project changes but then you need to be able to edit changes e.g. complete tasks add task

  if (
    projects &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject)
      .name;
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  return (
    tasks && (
      <div className='tasks' data-testid='tasks'>
        <h2 data-testid='project-name'>{projectName}</h2>
        <ul className='tasks__list'>
          {tasks.due.map((task) => (
            <li key={`${task.taskId}`}>
              <Checkbox id={task.taskId} taskDesc={task.task} />
              <span>{task.name}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Tasks;
