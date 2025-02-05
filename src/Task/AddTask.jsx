import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { database, ref, push, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2'; // استيراد مكتبة SweetAlert

const AddTask = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: new Date(),
        endDate: null,
        status: 'Pending',
        assignee: '',
        priority: 'P0'
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [user, setUser] = useState(null); // Store the current authenticated user
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

    useEffect(() => {
        // Check the user's authentication status when the component mounts
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Set user if authenticated
            } else {
                setUser(null); // Set user to null if not authenticated
            }
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEndDateChange = (date) => {
        setFormData({
            ...formData,
            endDate: date
        });
    };

    const handleStartDateChange = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            setFormData({
                ...formData,
                startDate: date
            });
        }
    };

    const validateForm = () => {
        // Check if title is empty
        if (!formData.title) {
            return 'Title is required!';
        }
        // Check if start date is after end date
        if (formData.endDate && formData.startDate > formData.endDate) {
            return 'End date cannot be before start date!';
        }
        // Check if description is empty
        if (!formData.description) {
            return 'Description is required!';
        }
        return ''; // No errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to be logged in to add a task!',
            });
            return;
        }

        const validationError = validateForm();
        if (validationError) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Form',
                text: validationError,
            });
            return;
        }

        const serializableFormData = {
            ...formData,
            startDate: formData.startDate.toISOString(),
            endDate: formData.endDate ? formData.endDate.toISOString() : null,
            userId: user.uid // Store the userId with the task data
        };

        const newTaskRef = ref(database, 'tasks');
        push(newTaskRef, serializableFormData)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Task added successfully!',
                });
                setFormData({
                    title: '',
                    description: '',
                    startDate: new Date(),
                    endDate: null,
                    status: 'Pending',
                    assignee: '',
                    priority: 'P0'
                });
                setShowPopup(false); 
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error adding task: ' + error.message,
                });
            });
    };
    const handleStatusChange = (event) => {
        setNewStatus(event.target.value); 
        window.location.reload(); 
    };
    
    return (
        <div className="w-full h-full flex justify-center items-center">
            {/* Button to trigger the popup */}
            <button 
                onClick={() => setShowPopup(true)} 
                className="w-[200px] p-3 bg-indigo-500 rounded-lg text-center text-white hover:bg-indigo-600 transition duration-300"
            >
                Add New Task
            </button>

            {/* Popup */}
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-[500px]">
                        <h1 className="text-3xl font-bold my-8 text-center">Add New Task</h1>
                        <form className="w-full mt-12 sm:mt-0 max-w-lg" onSubmit={handleSubmit}>
                            {successMessage && <div className="text-green-600 mb-4 text-center">{successMessage}</div>}
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                                        Title
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                                        id="title"
                                        type="text"
                                        placeholder="Task Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                                        id="description"
                                        placeholder="Task Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="startDate">
                                        Start Date
                                    </label>
                                    <DatePicker
                                        selected={formData.startDate}
                                        onChange={handleStartDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="endDate">
                                        End Date
                                    </label>
                                    <DatePicker
                                        selected={formData.endDate}
                                        onChange={handleEndDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
                                        Status
                                    </label>
                                    <select
                                        className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Deployed">Deployed</option>
                                        <option value="Deferred">Deferred</option>
                                    </select>
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="priority">
                                        Priority
                                    </label>
                                    <select
                                        className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                                        id="priority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                    >
                                        <option value="P0">low</option>
                                        <option value="P1">medium</option>
                                        <option value="P2">high</option>
                                    </select>
                                </div>
                            </div>
                            <button
                             onChange={handleStatusChange}
                                type="submit"
                                className="mt-8 w-full p-3 bg-indigo-500 rounded-lg text-center text-white hover:bg-indigo-600 transition duration-300"
                            >
                                Add Task
                            </button>
                        </form>
                        <button 
                            onClick={() => setShowPopup(false)} 
                            className="mt-4 w-full p-3 bg-gray-400 rounded-lg text-center text-white hover:bg-gray-500 transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTask;
