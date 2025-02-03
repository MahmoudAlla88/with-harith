
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { database, ref, onValue } from '../firebase';  // استيراد Firebase
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const Card = ({ label, count, bg }) => {
    return (
        <Link to='/allTask'>
         <div className="w-full md:w-64 h-60 bg-white p-5 shadow-md rounded-md flex flex-col justify-between cursor-pointer">
            <div className="h-full flex flex-1 flex-col justify-between">
                <p className="text-base text-gray-600">{label}</p>
                <span className="text-2xl font-semibold">{count}</span>
                <span className="text-sm text-gray-400">{"110 last month"}</span>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${bg}`}>
                {label.charAt(0)}
            </div>
          </div>
        </Link>
    );
};

Card.propTypes = {
    label: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    bg: PropTypes.string.isRequired,
};

const Dashboard = () => {
    const [stats, setStats] = useState([
        { label: "TOTAL TASK", total: 0, bg: "bg-[#1d4ed8]" },
        { label: "COMPLETED TASK", total: 0, bg: "bg-[#0f766e]" },
        { label: "TASK IN PROGRESS", total: 0, bg: "bg-[#f59e0b]" },
        { label: "PENDING", total: 0, bg: "bg-[#be185d]" },
        { label: "DEPLOYED", total: 0, bg: "bg-[#f59e0b]" },
        { label: "DEFERRED", total: 0, bg: "bg-[#0f766e]" },
    ]);

    useEffect(() => {
        // جلب المهام في الوقت الحقيقي من Firebase
        const tasksRef = ref(database, "tasks");
        onValue(tasksRef, (snapshot) => {
            const tasksData = snapshot.val();
            if (tasksData) {
                // تحويل الكائن إلى مصفوفة من المهام
                const tasksArray = Object.values(tasksData);
                // تصفية المهام التي لم يتم حذفها
                const filteredTasks = tasksArray.filter(task => !task.isDeleted);

                // حساب إجمالي المهام في كل حالة
                const totalTasks = filteredTasks.length;
                const completedTasks = filteredTasks.filter(task => task.status === 'Completed').length;
                const inProgressTasks = filteredTasks.filter(task => task.status === 'In Progress').length;
                const pendingTasks = filteredTasks.filter(task => task.status === 'Pending').length;

                setStats(prevStats => [
                    { ...prevStats[0], total: totalTasks },  // إجمالي المهام
                    { ...prevStats[1], total: completedTasks },  // المهام المكتملة
                    { ...prevStats[2], total: inProgressTasks },  // المهام الجارية
                    { ...prevStats[3], total: pendingTasks },  // المهام المعلقة
                    { ...prevStats[4], total: 10 },  // عدد المهام الموزعة (قيمة افتراضية هنا)
                    { ...prevStats[5], total: 5 },  // عدد المهام المؤجلة (قيمة افتراضية هنا)
                ]);
            }
        });

    }, []);

    const chartData = {
        labels: ['Completed', 'In Progress', 'Pending'],  // هذه هي التسميات التي تمثل الحالات
        datasets: [{
          data: [stats[1]?.total, stats[2]?.total, stats[3]?.total],  // استخدام قيم stats لحساب البيانات
          backgroundColor: ['#0f766e', '#f59e0b', '#be185d'],  // تخصيص الألوان لكل حالة
          borderColor: ['#0f766e', '#f59e0b', '#be185d'],  // ألوان الحدود إذا كنت ترغب في استخدامها
          borderWidth: 1  // عرض حدود القطاعات
        }]
      };
      

    return (
        <div className="mx-full w-[80%]">
            <div className="flex flex-col w-full justify-between" >
                <h1 className="sm:text-2xl text-3xl font-bold my-8 text-center">Tasks</h1>
                <div className="h-auto w-80% mx-auto py-4 px-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4  place-items-center mt-4">
                        {stats.map(({ label, total, bg }, index) => (
                            <Card key={index} bg={bg} label={label} count={total} />
                        ))}
                    </div>
                </div>
                <div className="w-[50%] mx-auto my-10 bg-white p-5 shadow-md rounded-md">
                    <h2 className="text-xl font-bold text-center mb-4">Task Status Distribution</h2>
                    <Pie data={chartData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
