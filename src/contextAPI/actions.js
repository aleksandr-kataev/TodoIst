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

export const getTasksFromDb = async (userID, selectedProject) => {
  let ref = db.collection('tasks').where('userId', '==', userID);

  if (selectedProject && !collatedTasksExist(selectedProject)) {
    ref = ref.where('projectId', '==', selectedProject);
  } else if (selectedProject === 'TODAY') {
    ref = ref.where('date', '==', moment().format('DD/MM/YYYY'));
  } else if (selectedProject === 'INBOX' || selectedProject === 0) {
    ref = ref.where('date', '==', '');
  }

  const res = await ref.get();

  const tasks = [];

  res.forEach((doc) => {
    tasks.push(doc.data());
  });

  if (selectedProject === 'NEXT_7') {
    return tasks.filter(
      (task) =>
        moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
        task.archived !== true,
    );
  }
  return tasks.filter((task) => task.archived !== false);
};

export const deleteProjectFromDb = (docId) => {
  db.collection('projects').doc(docId).delete();
};
