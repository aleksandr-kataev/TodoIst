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

  return (
    <div className='sidebar' data-testid='sidebar'>
      <ul className='sidebar__generic'>
        <li
          data-testid='inbox'
          className={
            selectedProject === 'INBOX' ? 'active' : undefined
          }
        >
          <div
            aria-label='Show inbox tasks'
            data-testid='inbox-action'
            tabIndex={0}
            role='button'
            onClick={async () => {
              dispatch({
                type: 'SELECT_PROJECT',
                payload: 'INBOX',
              });
            }}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                dispatch({
                  type: 'SELECT_PROJECT',
                  payload: 'INBOX',
                });
              }
            }}
          >
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>
        <li
          data-testid='today'
          className={
            selectedProject === 'TODAY' ? 'active' : undefined
          }
        >
          <div
            aria-label='Show todays tasks'
            data-testid='today-action'
            tabIndex={0}
            role='button'
            onClick={async () => {
              dispatch({
                type: 'SELECT_PROJECT',
                payload: 'TODAY',
              });
            }}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                dispatch({
                  type: 'SELECT_PROJECT',
                  payload: 'TODAY',
                });
              }
            }}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          data-testid='next_7'
          className={
            selectedProject === 'NEXT_7' ? 'active' : undefined
          }
        >
          <div
            aria-label='Show tasks for the next 7 days'
            data-testid='next_7-action'
            tabIndex={0}
            role='button'
            onClick={async (e) => {
              if (e.key === 'Enter') {
                dispatch({
                  type: 'SELECT_PROJECT',
                  payload: 'NEXT_7',
                });
              }
            }}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                dispatch({
                  type: 'SELECT_PROJECT',
                  payload: 'NEXT_7',
                });
              }
            }}
          >
            <span>
              <FaRegCalendar />
            </span>
            <span>Next 7 days</span>
          </div>
        </li>
      </ul>
      <div
        className='sidebar__middle'
        aria-label='Show/Hide projects'
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShowProjects(!showProjects);
        }}
        role='button'
        tabIndex={0}
      >

        <span>
          <FaChevronDown
            className={!showProjects ? 'hidden-projects' : undefined}
          />
        </span>
        <p>Projects</p>

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
// CARRY ON WITH THE VIDEO
// add task doesnt get highlighted properly
