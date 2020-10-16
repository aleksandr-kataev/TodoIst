import React, { useState } from 'react';
import { db } from '../../firebase';
import { generatePushId } from '../../util';
import { useStateValue } from '../../contextAPI/StateProvider';

const AddProject = () => {
  const [show, setShow] = useState(false);
  const [projectName, setProjectName] = useState('');
  const projectId = generatePushId();
  const [{ selectedProject }, dispatch] = useStateValue();

  const user = {
    id: 'ftg34v',
  };

  const addProject = () => {
    //validation for project name
    const project = {
      projectId,
      name: projectName,
      userId: user.id,
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
            data-testid='hide-project-overlay'
            className='add-project__cancel'
            onClick={() => setShow(false)}
          >
            Cancel
          </span>
        </div>
      )}
      <span className='add-project__plus'>+</span>
      <span
        data-testid='add-project-action'
        className='add-project__text'
        onClick={() => setShow(!show)}
      >
        Add project
      </span>
    </div>
  );
};

export default AddProject;
