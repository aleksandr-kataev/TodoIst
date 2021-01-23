import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';
import { useStateValue } from '../contextAPI/StateProvider';
import { useAuth } from '../contextAPI/AuthContext';

const AddProject = () => {
  const [show, setShow] = useState(false);
  const [projectName, setProjectName] = useState('');
  const projectId = uuidv4();
  const [, dispatch] = useStateValue();

  const { currentUser } = useAuth();

  const addProject = () => {
    //validation for project name
    const project = {
      projectId,
      name: projectName,
      userId: currentUser.uid,
    };

    db.collection('projects')
      .add(project)
      .then(() => {
        dispatch({
          type: 'ADD_PROJECT',
          payload: project,
        });
        setProjectName('');
        setShow(false);
      });
  };

  return (
    <div className='add-project' data-testid='add-project'>
      {show && (
        <div className='add-project__input'>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className='add-project__name'
            data-testid='project-name'
            type='text'
            placeholder='Name your project'
          />
          <button
            className='add-project__submit'
            type='button'
            onClick={() => addProject()}
            data-testid='add-project-submit'
          >
            Add project
          </button>
          <span
            aria-label='Cancel adding projects'
            data-testid='hide-project-overlay'
            className='add-project__cancel'
            onClick={() => setShow(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShow(false);
              }
            }}
            role='button'
            tabIndex={0}
          >
            Cancel
          </span>
        </div>
      )}
      <div
        aria-label='Add project'
        data-testid='add-project-action'
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setShow(!show);
          }
        }}
        role='button'
        tabIndex={0}
        className='add-project__button'
      >
        <span className='add-project__plus'>+</span>
        <span className='add-project__text'>
          Add project
        </span>
      </div>

    </div>
  );
};

export default AddProject;
