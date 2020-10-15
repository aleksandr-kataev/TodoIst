import React, { useState } from 'react';
import { useStateValue } from '../contextAPI/StateProvider';
import Project from './Project';
import { getTasksFromDb } from '../contextAPI/actions';

const Projects = () => {
  const [
    { projects, tasks, selectedProject },
    dispatch,
  ] = useStateValue();

  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-testid='project-action-parent'
        data-doc-id={project.docId}
        className={
          selectedProject === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
      >
        <div
          role='button'
          tabIndex={0}
          className='sidebar__project-button'
          data-testid='project-action'
          aria-label={`Select ${project.name} as the task project`}
          onClick={async () => {
            dispatch({
              type: 'SELECT_PROJECT',
              payload: project.projectId,
            });
          }}
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              dispatch({
                type: 'SELECT_PROJECT',
                payload: project.projectId,
              });
            }
          }}
        >
          <Project project={project} />
        </div>
      </li>
    ))
  );
};

export default Projects;
