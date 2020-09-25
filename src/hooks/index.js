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

export const useProjects = (userID) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    db.firestore()
      .collection('projects')
      .where('userId', '==', userID)
      .orderBy('projectId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          //???
          docId: project.id,
        }));

        //Check to make sure no infinite loops
        if (
          JSON.stringify(allProjects) !== JSON.stringify(projects)
        ) {
          setProjects(allProjects);
        }
      });
  }, []);
};

// ftg34v ui

// fh65c% pi
// ltdv3a pi2

// fgtrs2 ti
// ftgd23 ti2
// grqs3f ti3
