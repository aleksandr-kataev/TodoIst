import React from 'react';
import moment from 'moment';
import {
  FaRegPaperPlane,
  FaSpaceShuttle,
  FaSun,
} from 'react-icons/fa';

const TaskDate = ({
  quickAdd,
  setTaskDate,
  showTaskDate,
  setShowTaskDate,
}) =>
  showTaskDate && (
    <div
      className={quickAdd ? 'task-date-quick-add' : 'task-date'}
      data-testid='task-date-overlay'
    >
      <ul className='task-date__list'>
        <li
          data-testid='task-date-overlay'
        >
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format('DD/MM/YYYY'));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowTaskDate(false);
                setTaskDate(moment().format('DD/MM/YYYY'));
              }
            }}
            aria-label='Select today as due date'
            tabIndex={0}
            role='button'
          >
            <span>
              <FaSpaceShuttle />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          data-testid='task-date-tomorrow'
        >
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowTaskDate(false);
                setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
              }
            }}
            tabIndex={0}
            aria-label='Select tomorrow as due date'
            role='button'
          >
            <span>
              <FaSun />
            </span>
            <span>Tomorrow</span>
          </div>
        </li>
        <li
          data-testid='task-date-next-week'
        >
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'day').format('DD/MM/YYYY'));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowTaskDate(false);
                setTaskDate(moment().add(7, 'day').format('DD/MM/YYYY'));
              }
            }}
            tabIndex={0}
            aria-label='Select next 7 days as due date'
            role='button'
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Next week</span>
          </div>
        </li>
      </ul>
    </div>
  );

export default TaskDate;
