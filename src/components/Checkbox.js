import { db } from '../firebase';

export const Checkbox = ({ id }) => {
  const archiveTask = () => {
    db.firestore()
      .collection('tasks')
      .doc(id)
      .update({ archived: true });
  };

  //add a return statement
};
