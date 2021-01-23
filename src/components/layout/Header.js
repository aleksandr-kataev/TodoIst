import React, { useState } from 'react';
import { FaFillDrip } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contextAPI/AuthContext';
import logo from '../../images/logo.png';
import AddTask from '../AddTask';

const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push('/login');
  };
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

            >
              <button
                aria-label='Quick add task'
                type='button'
                onClick={() => {
                  setShowQuickAddTask(true);
                  setShowQuickAddTask(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setShowQuickAddTask(true);
                    setShowQuickAddTask(true);
                  }
                }}
                tabIndex={0}
              >
                +
              </button>
            </li>

            <li
              className='settings__darkmode'
            >
              <button
                aria-label='Change theme'
                data-testid='dark-mode-action'
                type='button'
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setDarkMode(!darkMode);
                  }
                }}
                tabIndex={0}
              >
                <FaFillDrip />
              </button>
            </li>
            <li className='settings__logout'>
              <button
                aria-label='Logout'
                type='button'
                onClick={handleLogout}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLogout();
                  }
                }}
                tabIndex={0}
              >
                Logout
              </button>
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
