import React, { useState, useEffect } from 'react';
import './App.css';
import Searchbox from './components/Searchbox';
import Overviewcard from './components/Overviewcard';
import ActiveIcon from "./assets/Active.png";
import CompletedIcon from "./assets/Completed.png";
import ExpiredIcon from "./assets/Expired.png";
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import noTasksIcon from "./assets/no-task.png";
import { getTasks, addTask, updateTask, deleteTask } from './services/api';
import TaskList from './components/TaskList';

function App() {
  // State to hold tasks, modal visibility, and the current task being edited
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  // Function to handle adding a new task
  const handleAddTodo = async (newTodo) => {
    try {
      const addedTodo = await addTask(newTodo);
      setTasks(prevTasks => [...prevTasks, addedTodo]);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  // Function to handle updating an existing task
  const handleUpdateTodo = async (updatedTodo) => {
    try {
      const result = await updateTask(updatedTodo._id, updatedTodo);
      setTasks(prevTasks =>
        prevTasks.map(task => (task._id === updatedTodo._id ? result : task))
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  // Function to handle deleting a task
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Categorizing tasks based on their status
  const expiredTasks = tasks.filter(task => task.status === 'expired');
  const activeTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  // Function to render a list of tasks, with handling for empty states
  const renderTaskList = (tasks, status) => (
    tasks.length > 0 ? (
      tasks.map(task => (
        <TaskCard
          key={task._id}
          status={status}
          {...task}
          onEdit={() => {
            setCurrentTodo(task);
            setIsModalOpen(true);
          }}
          onStart={() => handleUpdateTodo({ ...task, status: 'in-progress' })}
          onComplete={() => handleUpdateTodo({ ...task, status: 'completed' })}
          onDelete={() => handleDeleteTodo(task._id)}
        />
      ))
    ) : (
      <div className='empty_msg'>
        <img className='noTasksIcon' src={noTasksIcon} alt="No tasks" />
        <p>No tasks available!!</p>
      </div>
    )
  );

  return (
    <main>
      {/* Search box component */}
      <Searchbox />

      <section>
        <div className="overView_row">
          {/* Overview cards displaying task counts */}
          <Overviewcard icon={ExpiredIcon} title={"Expired Tasks"} fill={"#F42D20"} num={expiredTasks.length} />
          <Overviewcard icon={ActiveIcon} title={"All Active Tasks"} fill={"#E89271"} num={activeTasks.length} />
          <Overviewcard icon={CompletedIcon} title={"Completed Tasks"} fill={"#70A1E5"} num={completedTasks.length} total={tasks.length} />
          <button className='add_btn' onClick={() => setIsModalOpen(true)}>Add Task</button>
        </div>

        {/* Task lists for different statuses */}
        <TaskList title="To Do" tasks={tasks} status="all_tasklist" renderTaskList={renderTaskList} num={tasks.length} />
        <TaskList title="In Progress" tasks={activeTasks} status="active_tasklist" renderTaskList={renderTaskList} num={activeTasks.length} />
        <TaskList title="Completed" tasks={completedTasks} status="completed_tasklist" renderTaskList={renderTaskList} num={completedTasks.length} />
        <TaskList title="Expired" tasks={expiredTasks} status="expired_tasklist" renderTaskList={renderTaskList} num={expiredTasks.length} />
      </section>

      {/* Modal for adding/editing tasks */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTodo}
        onUpdate={handleUpdateTodo}
        currentTodo={currentTodo}
      />
    </main>
  );
}

export default App;
