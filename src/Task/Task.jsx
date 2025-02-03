import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

const FIREBASE_URL = "https://reactprojectteam-default-rtdb.firebaseio.com/tasks"; // قاعدة البيانات

const Task = ({ id, title, completed, description, startDate, endDate, status, assignee, priority }) => {
    const [taskStatus, setTaskStatus] = useState(status);
    const [taskAssignee, setTaskAssignee] = useState(assignee);
    const [taskPriority, setTaskPriority] = useState(priority);
    const [taskCompleted, setTaskCompleted] = useState(completed);

    const handleToggleCompleted = async () => {
        try {
            await axios.patch(`${FIREBASE_URL}/${id}.json`, {
                completed: !taskCompleted,
            });
            setTaskCompleted(!taskCompleted);
        } catch (error) {
            console.error("❌ Error updating task completion:", error);
        }
    };

    const handleRemoveTask = async () => {
        try {
            await axios.delete(`${FIREBASE_URL}/${id}.json`);
            alert("Task removed successfully!");
        } catch (error) {
            console.error("❌ Error deleting task:", error);
        }
    };

    const handleUpdateTask = async (field, value) => {
        try {
            await axios.patch(`${FIREBASE_URL}/${id}.json`, {
                [field]: value,
            });

            // تحديث الحالة المحلية
            if (field === 'status') setTaskStatus(value);
            if (field === 'assignee') setTaskAssignee(value);
            if (field === 'priority') setTaskPriority(value);
        } catch (error) {
            console.error(`❌ Error updating ${field}:`, error);
        }
    };

    return (
        <li className={`task ${taskCompleted ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={taskCompleted}
                onChange={handleToggleCompleted}
            />
            <span>{title}</span>
            <p>{description}</p>
            <span className='text-rose-400'>Start Date: {startDate.slice(0, 10)}</span>
            <span>End Date: {endDate ? endDate.slice(0, 10) : '---'}</span>
            <select value={taskStatus} onChange={event => handleUpdateTask('status', event.target.value)}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Deployed">Deployed</option>
                <option value="Deferred">Deferred</option>
            </select>
            <input 
                type="text" 
                value={taskAssignee} 
                onChange={event => handleUpdateTask('assignee', event.target.value)} 
                placeholder="Assignee" 
            />
            <select value={taskPriority} onChange={event => handleUpdateTask('priority', event.target.value)}>
                <option value="">Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
            </select>
            <button onClick={handleRemoveTask}>Remove</button>
        </li>
    );
};

Task.propTypes = {
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    status: PropTypes.string.isRequired,
    assignee: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
};

export default Task;
