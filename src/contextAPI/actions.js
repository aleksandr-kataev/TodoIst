import { useStateValue } from './stateProvider';
const [selectedProject, projects, dispatch] = useStateValue();

export const setProject = (project) => {
  dispatch({
    type: 'SELECT_PROJECT',
    payload: project,
  });
};
