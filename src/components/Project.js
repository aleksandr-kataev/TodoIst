import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import {
  useProjectsValue,
  useSelectedProjectValue,
} from '../contextAPI';

import { db } from '../firebase';

export const Project = ({ project }) => {
  const [showConf, setShowConf] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId) => {
    db.collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject('INBOX');
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
                onClick={() => deleteProject(project.docId)}
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
