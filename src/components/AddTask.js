import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useStateValue } from '../contextAPI/StateProvider';
import { useAuth } from '../contextAPI/AuthContext';
import ProjectOverlay from './ProjectOverlay';
import TaskDate from './TaskDate';
import { db } from '../firebase';

const AddTask = ({
  quickAdd,
  showAddTaskMain = true,
  showShouldMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const { currentUser } = useAuth();
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(showShouldMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const [{ selectedProject }, dispatch] = useStateValue();

  const addTaskToDb = () => {
    let projectId = project || selectedProject;

    if (projectId === 'TODAY' || projectId === 'NEXT_7') {
      projectId = 'INBOX';
    }

    let collatedDate = '';

    if (selectedProject === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (selectedProject === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }

    const taskObj = {
      completed: false,
      date: collatedDate || taskDate,
      task,
      projectId,
      taskId: uuidv4(),
      userId: currentUser.uid,
    };
    return (
      task &&
      projectId &&
      db
        .collection('tasks')
        .add(taskObj)
        .then(() => {
          dispatch({
            type: 'ADD_TASK',
            payload: taskObj,
          });
        })
    );
  };

  const handleAdd = () => {
    setTask('');
    setTaskDate('');
    if (showQuickAddTask) {
      addTaskToDb();
      setShowQuickAddTask(false);
    } else {
      addTaskToDb();
      setShowMain(false);
    }
  };
  return (
    <div
      className={
        showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'
      }
      data-testid='add-task-comp'
    >
      {showAddTaskMain && (
        <div
          className='add-task__shallow'
          data-testid='show-main-action'
          onClick={() => setShowMain(!showMain)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setShowMain(!showMain);
            }
          }}
          tabIndex={0}
          aria-label='Add task'
          role='button'
        >
          <span className='add-task__plus'>+</span>
          <span className='add-task__text'>Add Task</span>
        </div>
      )}
      {(showMain || showQuickAddTask) && (
        <div className='add-task__main' data-testid='add-task-main'>
          {showQuickAddTask && (
            <>
              <div data-testid='quick-add-task'>
                <h2 className='header'>Quick Add Task</h2>
                <span
                  className='add-task__cancel-x'
                  data-testid='add-task-quick-cancel'
                  aria-label='Close the quick task overlay'
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                    setTask('');
                    setTaskDate('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setShowMain(false);
                      setShowProjectOverlay(false);
                      setShowQuickAddTask(false);
                      setTask('');
                      setTaskDate('');
                    }
                  }}
                  tabIndex={0}
                  role='button'
                >
                  X
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            quickAdd={quickAdd}
            showQuickAddTask
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            quickAdd={quickAdd}
            showQuickAddTask
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className='add-task__content'
            aria-label='Enter your task'
            data-testid='add-task-content'
            type='text'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type='button'
            className='add-task__submit'
            data-testid='add-task'
            onClick={handleAdd}
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className='add-task__cancel'
              data-testid='add-task-main-cancel'
              aria-label='Cancel adding a task'
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
                setTask('');
                setTaskDate('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowMain(false);
                  setShowProjectOverlay(false);
                  setTask('');
                  setTaskDate('');
                }
              }}
              tabIndex={0}
              role='button'
            >
              Cancel
            </span>
          )}
          <span
            className='add-task__date'
            aria-label='Choose the date'
            data-testid='show-task-date-overlay'
            onClick={() => {
              setShowProjectOverlay(false);
              setShowTaskDate(!showTaskDate);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowProjectOverlay(false);
                setShowTaskDate(!showTaskDate);
              }
            }}
            tabIndex={0}
            role='button'
          >
            <FaRegCalendarAlt />
          </span>
          <span
            className='add-task__project'
            aria-label='Show projects'
            data-testid='show-project-overlay'
            onClick={() => {
              setShowTaskDate(false);
              setShowProjectOverlay(!showProjectOverlay);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowTaskDate(false);
                setShowProjectOverlay(!showProjectOverlay);
              }
            }}
            tabIndex={0}
            role='button'
          >
            <FaRegListAlt />
          </span>

        </div>
      )}
    </div>
  );
};

export default AddTask;
