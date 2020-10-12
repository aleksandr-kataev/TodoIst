import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteProjectFromDb } from '../contextAPI/actions';
import { useStateValue } from '../contextAPI/StateProvider';

const Project = ({ project }) => {
  const [, dispatch] = useStateValue();
  const [showConf, setShowConf] = useState(false);

  const deleteProject = (projectId) => {
    deleteProjectFromDb(projectId);
    dispatch({
      type: 'REMOVE_PROJECT',
      payload: projectId,
    });
    dispatch({
      type: 'SELECT_PROJECT',
      payload: 'INBOX',
    });
  };

  return (
    <>
      <span className='sidebar__dot'>•</span>
      <span className='sidebar__project-name'>{project.name}</span>
      <span
        className='sidebar__project-delete'
        data-testid='delete-project'
        onClick={() => {
          setShowConf(!showConf);
        }}
      >
        <FaTrashAlt />
        {showConf && (
          <div className='project-delete-modal'>
            <div className='project-delete-modal__inner'>
              <p>Are you sure you want to delete this project?</p>
              <button
                type='button'
                onClick={() => deleteProject(project.projectId)}
              >
                Delete
              </button>
              <span
                onClick={() => {
                  setShowConf(!showConf);
                }}
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

export default Project;
