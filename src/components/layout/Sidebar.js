import React, { useState } from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';
import Projects from '../Projects';
import { useStateValue } from '../../contextAPI/StateProvider';
import AddProject from '../AddProject';

const Sidebar = () => {
  const [{ selectedProject }, dispatch] = useStateValue();
  const [showProjects, setShowProjects] = useState(true);

  const user = {
    id: 'ftg34v',
  };

  return (
    <div className='sidebar' data-testid='sidebar'>
      <ul className='sidebar__generic'>
        <li
          data-testid='inbox'
          className={
            selectedProject === 'INBOX' ? 'active' : undefined
          }
          onClick={async () => {
            dispatch({
              type: 'SELECT_PROJECT',
              payload: 'INBOX',
            });
          }}
        >
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li
          data-testid='today'
          className={
            selectedProject === 'TODAY' ? 'active' : undefined
          }
          onClick={async () => {
            dispatch({
              type: 'SELECT_PROJECT',
              payload: 'TODAY',
            });
          }}
        >
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Today</span>
        </li>
        <li
          data-testid='next_7'
          className={
            selectedProject === 'NEXT_7' ? 'active' : undefined
          }
          onClick={async () => {
            dispatch({
              type: 'SELECT_PROJECT',
              payload: 'NEXT_7',
            });
          }}
        >
          <span>
            <FaRegCalendar />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>
      <div
        className='sidebar__middle'
        onClick={() => setShowProjects(!showProjects)}
      >
        <span>
          <FaChevronDown
            className={!showProjects ? 'hidden-projects' : undefined}
          />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className='sidebar__projects'>
        {showProjects && <Projects />}
      </ul>
      {showProjects && <AddProject />}
    </div>
  );
};

export default Sidebar;

// Next 7 days dooesnt work properly
