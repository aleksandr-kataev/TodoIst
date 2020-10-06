export const initialState = {
  selectedProject: 'INBOX',
  projects: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PROJECTS':
      return {
        ...state,
        projects: action.payload,
      };

    case 'SELECT_PROJECT':
      return {
        ...state,
        selectedProject: action.payload,
      };
  }
};
