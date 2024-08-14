import React, { useState } from 'react';
import moreIcon from "../assets/more.png";

const TaskCard = ({ title, description, deadline, status, onEdit, onStart, onComplete, onDelete }) => {
  // State to manage the visibility of the dropdown menu
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  // Function to format the date in 'DD/MM/YYYY' format
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  // Function to display only the first line of the description
  const truncateDescription = (desc) => {
    const firstLine = desc.split('\n')[0];
    return firstLine;
  };

  return (
    <div className="task_card">
      {/* Task title with a dropdown toggle icon */}
      <h3>
        {title}
        <span onClick={toggleDropdown}>
          <img src={moreIcon} alt="More options" />
        </span>
      </h3>

      {/* Task description (only the first line) */}
      <p className='description'>{truncateDescription(description)}</p>

      {/* Task status */}
      <p className={`${status} deadline`}>{status}</p>

      {/* Task deadline, formatted as 'DD/MM/YYYY' */}
      <p className='deadline'>Deadline: {formatDate(deadline)}</p>

      {/* Dropdown menu with task options (conditionally rendered) */}
      {isDropdownVisible && (
        <div className="dropdown">
          <ul>
            {/* Options available based on the task's current status */}
            {status !== 'expired' && status !== 'completed' && <li onClick={onEdit}>Edit Task</li>}
            {status === 'inactive' && <li onClick={onStart}>Start Task</li>}
            {status !== 'completed' && status !== 'expired' && <li onClick={onComplete}>Complete Task</li>}
            <li onClick={onDelete}>Remove Task</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
