import React from 'react';
import { useStateValue } from '../contextAPI/StateProvider';
import { db } from '../firebase';

export const Checkbox = ({ id, taskId }) => {
  const [{ tasks }, dispatch] = useStateValue();
  const completeTask = async () => {
    await db.collection('tasks').doc(id).update({ completed: true });
    dispatch({
      type: 'COMPLETE_TASK',
      payload: taskId,
    });
    console.log(tasks);
  };
  return (
    <div
      className='checkbox-holder'
      data-testid='checkbox-action'
      onClick={() => completeTask()}
    >
      <span className='checkbox' />
    </div>
  );
};
//action to remove item from redux
