import { useState, useEffect } from 'react';
import moment from 'moment';
import { db } from '../firebase';

export const useTask = (userID) => (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    // Select all tasks by the userId
    let dbTasks = db
      .collection('tasks')
      .where('userId', '==', userID);

    //Filter tasks based onthe selectedProject or quickAccessTask (INBOX, TODAY, NEXT 7 DAYS)

    dbTasks =
      selectedProject === 'TODAY'
        ? (dbTasks = dbTasks.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY'),
          ))
        : selectedProject === 'INBOX'
        ? (dbTasks = dbTasks.where('projectId', '==', ''))
        : selectedProject === 'NEXT_7'
        ? dbTasks
        : (dbTasks = dbTasks.where(
            'projectId',
            '==',
            selectedProject,
          ));

    dbTasks = dbTasks.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
              (task) =>
                moment(task.date, 'DD-MM-YYYY').diff(
                  moment(),
                  'days',
                ) <= 7 && task.archived !== true,
            )
          : newTasks.filter((task) => task.archived !== true),
      );
      setArchivedTasks(
        newTasks.filter((task) => task.archived !== false),
      );
    });

    return () => dbTasks();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};
