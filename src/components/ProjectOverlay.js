import React from 'react';
import { useStateValue } from '../contextAPI/StateProvider';

const ProjectOverlay = ({
  quickAdd,
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
}) => {
  const [{ projects }] = useStateValue();
  return (
    projects &&
    showProjectOverlay && (
      <div
        className={
          quickAdd ? 'project-overlay-quick-add' : 'project-overlay'
        }
        data-testid='project-overlay'
      >
        <ul className='project-overlay__list'>
          {projects.map((project) => (
            <li
              key={project.projectId}
            >
              <div
                data-testid='project-overlay-action'
                onClick={() => {
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setProject(project.projectId);
                    setShowProjectOverlay(false);
                  }
                }}
                tabIndex={0}
                role='button'
                aria-label='Select the project'
              >
                {project.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default ProjectOverlay;
