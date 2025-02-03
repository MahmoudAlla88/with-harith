import { useState, useEffect } from 'react';
import { database, ref, set, get } from '../firebase';  // استيراد Firebase
import TaskList from './TaskList';

const Home = () => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState(''); // Optional for description input
    const [tasks, setTasks] = useState([]);

  
    useEffect(() => {
        const tasksRef = ref(database, "tasks");
        get(tasksRef).then(snapshot => {
            const tasksData = snapshot.val();
            if (tasksData) {
                setTasks(Object.values(tasksData)); 
            }
        });
    }, []);

    const handleAddTask = () => {
        if (newTaskTitle.trim()) {
            const newTaskId = Date.now(); 
            const taskRef = ref(database, "tasks/" + newTaskId);
            const newTask = {
                id: newTaskId,
                title: newTaskTitle,
                description: newTaskDescription || '', 
                status: 'Pending',
            };

            set(taskRef, newTask).then(() => {
                setTasks([...tasks, newTask]); 
                setNewTaskTitle('');
                setNewTaskDescription('');
            });
        }
    };

    return (
        <div>
            <div className="App">
                <h1 className='text-3xl font-bold underline'>Task Manager</h1>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={event => setNewTaskTitle(event.target.value)}
                    placeholder="Add a new task..."
                />
                <textarea
                    value={newTaskDescription}
                    onChange={event => setNewTaskDescription(event.target.value)}
                    placeholder="Task Description (optional)"
                />
                <button onClick={handleAddTask}>Add Task</button>
                <TaskList tasks={tasks} /> 
            </div>
        </div>
    );
};

export default Home;
