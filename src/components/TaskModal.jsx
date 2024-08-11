import React, { useState, useEffect } from 'react';
import plusIcon from "../assets/plus.png";
import ConfirmMsgModal from './ConfirmMsgModal';
import dot from "../assets/Ellipse.png";

const TaskModal = ({ isOpen, onClose, onAdd, onUpdate, currentTodo }) => {
    // State variables to manage input fields, error messages, and confirmation state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmation, setConfirmation] = useState(false);

    // Effect to populate the modal fields if editing an existing task
    useEffect(() => {
        if (currentTodo) {
            setTitle(currentTodo.title);
            setDescription(currentTodo.description);
            setDeadline(new Date(currentTodo.deadline).toISOString().slice(0, 16)); // Formatting deadline for input field
        } else {
            // Reset fields if not editing
            setTitle('');
            setDescription('');
            setDeadline('');
        }
    }, [currentTodo]);

    // Function to handle form submission for adding/updating tasks
    const handleSubmit = async () => {
        // Validate input fields
        if (!title) {
            setErrorMessage('Title is required.');
            return;
        }
        if (!description) {
            setErrorMessage('Description is required.');
            return;
        }
        if (!deadline) {
            setErrorMessage('Deadline is required.');
            return;
        }

        // Create a todo object with input values
        const todo = { title, description, deadline: new Date(deadline) };

        try {
            if (currentTodo) {
                // Update existing task
                await onUpdate({ ...todo, _id: currentTodo._id });
            } else {
                // Add new task
                await onAdd(todo);
            }
            setConfirmation(true); // Show confirmation modal on successful submission
        } catch (error) {
            console.error('Error submitting todo:', error);
            setErrorMessage('There was an error submitting the task. Please try again.');
        }
    };

    // If the modal is not open, return null (do not render anything)
    if (!isOpen) return null;

    return (
        <div className="modal">
            {!confirmation ? (
                <div className="modal-content">
                    <h2>
                        <img src={dot} alt="" className="dot" /> {currentTodo ? 'Edit Task' : 'Add Task'}
                        <span>
                            <img src={plusIcon} alt="Add" />
                        </span>
                    </h2>

                    {/* Display error message if there is one */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {/* Input field for task title */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="task_title"
                        required
                    />

                    {/* Textarea for task description */}
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="task_description"
                        required
                    />

                    {/* Input field for task deadline */}
                    <div className="task_deadline">
                        <label htmlFor="date">Deadline</label>
                        <input
                            id="date"
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />
                        <span onClick={handleSubmit}>Assigned to</span>
                    </div>
                </div>
            ) : (
                // Render confirmation message modal on successful task submission
                <ConfirmMsgModal close={onClose} setConfirmation={setConfirmation} />
            )}
        </div>
    );
};

export default TaskModal;
