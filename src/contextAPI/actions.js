import moment from 'moment';
import { db } from '../firebase';
import { collatedTasksExist } from '../util';

export const getProjectsFromDb = async (userID) => {
  const ref = db
    .collection('projects')
    .where('userId', '==', userID)
    .orderBy('projectId');
  const res = await ref.get();
  const projects = [];

  res.forEach((doc) => {
    projects.push(doc.data());
  });
  return projects;
};

export const getTasksFromDb = async (userId, selectedProject) => {
  let ref = db.collection('tasks').where('userId', '==', userId);

  if (selectedProject && !collatedTasksExist(selectedProject)) {
    ref = ref.where('projectId', '==', selectedProject);
  } else if (selectedProject === 'TODAY') {
    ref = ref.where('date', '==', moment().format('DD/MM/YYYY'));
  } else if (selectedProject === 'INBOX' || selectedProject === 0) {
    ref = ref.where('projectId', '==', 'INBOX');
  }

  const res = await ref.get();

  const allTasks = [];

  res.forEach((doc) => {
    allTasks.push(doc.data());
  });

  const separatedTasks = {
    due: [],
    completed: [],
  };

  if (selectedProject === 'NEXT_7') {
    separatedTasks.due = allTasks.filter(
      (task) =>
        moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
        task.completed !== true,
    );
  } else {
    separatedTasks.due = allTasks.filter(
      (task) => task.completed !== true,
    );
  }

  separatedTasks.completed = allTasks.filter(
    (task) => task.completed !== false,
  );

  return separatedTasks;
};

export const deleteProjectFromDb = (docId) => {
  db.collection('projects').doc(docId).delete();
};
