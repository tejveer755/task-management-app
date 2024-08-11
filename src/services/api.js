import axios from 'axios';

// Base URL for the API endpoint
const API_URL = 'https://task-management-app-backend-99fj.onrender.com/api/todos';

// Function to fetch all tasks from the server
export const getTasks = async () => {
    try {
        // Make a GET request to retrieve all tasks
        const response = await axios.get(API_URL);
        return response.data; // Return the response data (list of tasks)
    } catch (error) {
        // Log the error message to the console for debugging
        console.error('Error fetching todos:', error.response ? error.response.data : error.message);
        throw error; // Throw the error to be handled by the calling function
    }
};

// Function to add a new task to the server
export const addTask = async (todo) => {
    try {
        // Make a POST request to add a new task with the provided data
        const response = await axios.post(API_URL, {
            title: todo.title,              // Task title
            description: todo.description,  // Task description
            deadline: todo.deadline,        // Task deadline
            status: 'inactive'              // Default status for a new task
        });
        return response.data; // Return the response data (the newly added task)
    } catch (error) {
        // Log the error message to the console for debugging
        console.error('Error adding todo:', error.response ? error.response.data : error.message);
        throw error; // Throw the error to be handled by the calling function
    }
};

// Function to update an existing task on the server
export const updateTask = async (id, todo) => {
    try {
        // Make a PUT request to update the task with the specified ID
        const response = await axios.put(`${API_URL}/${id}`, {
            title: todo.title,              // Updated task title
            description: todo.description,  // Updated task description
            deadline: todo.deadline,        // Updated task deadline
            status: todo.status             // Updated task status
        });
        return response.data;               // Return the response data (the updated task)
    } catch (error) {
        // Log the error message to the console for debugging
        console.error('Error updating todo:', error.response ? error.response.data : error.message);
        throw error; // Throw the error to be handled by the calling function
    }
};

// Function to delete a task from the server
export const deleteTask = async (id) => {
    try {
        // Make a DELETE request to remove the task with the specified ID
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        // Log the error message to the console for debugging
        console.error('Error deleting todo:', error.response ? error.response.data : error.message);
        throw error; // Throw the error to be handled by the calling function
    }
};
