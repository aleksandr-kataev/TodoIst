/* eslint-disable no-case-declarations */
export const initialState = {
  projects: [],
  tasks: [],
  selectedProject: 'INBOX',
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PROJECTS':
      return {
        ...state,
        projects: action.payload,
      };
    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'SELECT_PROJECT':
      return {
        ...state,
        selectedProject: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
