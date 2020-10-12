import React, { useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants/index';
import {
  getTitle,
  getCollatedTitle,
  collatedTasksExist,
} from '../util';
import { useStateValue } from '../contextAPI/StateProvider';

export const Tasks = () => {
  const [
    { projects, tasks, selectedProject },
    dispatch,
  ] = useStateValue();

  let projectName = '';

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
    <div className='tasks' data-testid='tasks'>
      <h2 data-testid='project-name'>{projectName}</h2>
      <ul className='tasks__list'>
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} taskDesc={task.task} />
            <span>{task.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
