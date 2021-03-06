/* eslint-disable no-case-declarations */
export const initialState = {
  projects: null,
  tasks: null,
  selectedProject: 'INBOX',
  user: null,
};

const reducer = (state = initialState, action) => {
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
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          due: [...state.tasks.due, action.payload],
        },
      };

    case 'COMPLETE_TASK':
      return {
        ...state,
        tasks: {
          due: state.tasks.due.filter(
            (task) => task.taskId !== action.payload,
          ),
          completed: [
            ...state.tasks.completed,
            state.tasks.due.find(
              (task) => task.taskId === action.payload,
            ),
          ],
        },
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
