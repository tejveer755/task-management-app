import React, { useState, useEffect, useRef } from 'react';
import plusIcon from "../assets/plus.png";
import ConfirmMsgModal from './ConfirmMsgModal';
import dot from "../assets/Ellipse.png";

const TaskModal = ({ isOpen, onClose, onAdd, onUpdate, currentTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmation, setConfirmation] = useState(false);

    const modalRef = useRef(null);

    // Effect to populate the modal fields if editing an existing task
    useEffect(() => {
        if (currentTodo) {
            setTitle(currentTodo.title);
            setDescription(currentTodo.description);
            setDeadline(new Date(currentTodo.deadline).toISOString().slice(0, 16));
        } else {
            setTitle('');
            setDescription('');
            setDeadline('');
        }
    }, [currentTodo]);

    // Handle outside click to close the modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleSubmit = async () => {
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

        const todo = { title, description, deadline: new Date(deadline) };

        try {
            if (currentTodo) {
                await onUpdate({ ...todo, _id: currentTodo._id });
            } else {
                await onAdd(todo);
            }
            setConfirmation(true);
            setTitle("");
            setDescription("");
            setDeadline("");
        } catch (error) {
            console.error('Error submitting todo:', error);
            setErrorMessage('There was an error submitting the task. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            {!confirmation ? (
                <div className="modal-content" ref={modalRef}>
                    <h2>
                        <img src={dot} alt="" className="dot" /> {currentTodo ? 'Edit Task' : 'Add Task'}
                        <span>
                            <img src={plusIcon} alt="Add" />
                        </span>
                    </h2>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="task_title"
                        required
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="task_description"
                        required
                    />

                    <div className="task_deadline">
                        <label htmlFor="date">Deadline</label>
                        <input
                            id="date"
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />
                        <span onClick={handleSubmit}>Add Task</span>
                    </div>
                </div>
            ) : (
                <ConfirmMsgModal close={onClose} setConfirmation={setConfirmation} />
            )}
        </div>
    );
};

export default TaskModal;
