import React, { useState } from 'react';
import { FaPizzaSlice } from 'react-icons/fa';
import logo from '../../images/logo.png';
import AddTask from '../AddTask';

const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  return (
    <header className='header' data-testid='header'>
      <nav>
        <div className='logo'>
          <img src={logo} alt='ToDo' />
        </div>
        <div className='settings'>
          <ul>
            <li
              data-testid='quick-add-task-action'
              className='settings__add'
              onClick={() => {
                setShowQuickAddTask(true);
                setShowQuickAddTask(true);
              }}
            >
              +
            </li>

            <li
              data-testid='dark-mode-action'
              className='settings__darkmode'
              onClick={() => {
                setDarkMode(!darkMode);
              }}
            >
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
      <AddTask
        quickAdd
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );
};

export default Header;
