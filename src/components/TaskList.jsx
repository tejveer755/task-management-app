import React from 'react';

const TaskList = ({ title, tasks, status, renderTaskList, num }) => {
    return (
        <div className={`${status}`}>
            <li className='head'>{title} <span className='number'>{num}</span></li>
            {renderTaskList(tasks, status)}
        </div>
    );
};

export default TaskList;




