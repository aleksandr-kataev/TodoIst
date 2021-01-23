import React from 'react';
import { useStateValue } from '../contextAPI/StateProvider';
import { db } from '../firebase';

export default ({ id, taskId }) => {
  const [, dispatch] = useStateValue();
  const completeTask = async () => {
    await db.collection('tasks').doc(id).update({
      completed: true,
    });
    dispatch({
      type: 'COMPLETE_TASK',
      payload: taskId,
    });
  };
  return (
    <div
      className='checkbox-holder'
      data-testid='checkbox-action'
      onClick={() => completeTask()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') { completeTask(); }
      }}
      role='button'
      tabIndex={0}
      aria-label='Complete task'
    >
      <span className='checkbox' />
    </div>
  );
};
// action to remove item from redux
