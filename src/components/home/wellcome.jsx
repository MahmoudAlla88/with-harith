// // import { useEffect, useState } from "react";
// // import { auth } from "../../firebase"; // تأكد من استيراد Firebase بشكل صحيح

// // const Welcome = ({ onWelcomeComplete }) => {
// //   const [user, setUser] = useState(null);
// //   const [showWelcome, setShowWelcome] = useState(true); // حالة للتحكم في ظهور المكون

// //   useEffect(() => {
// //     // التحقق مما إذا كان المستخدم مسجل الدخول
// //     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
// //       setUser(currentUser);
// //       if (currentUser) {
// //         setShowWelcome(true); // إظهار الرسالة عند تسجيل الدخول

// //         // إخفاء المكون تلقائيًا بعد 3 ثوانٍ
// //         setTimeout(() => {
// //           setShowWelcome(false);
// //           onWelcomeComplete(); // إبلاغ الصفحة الرئيسية بأن الترحيب انتهى
// //         }, 3000);
// //       }
// //     });

// //     return () => unsubscribe(); // تنظيف الاشتراك عند إلغاء تحميل المكون
// //   }, [onWelcomeComplete]);

// //   const handleCloseMessage = () => {
// //     setShowWelcome(false);
// //     onWelcomeComplete(); // إبلاغ الصفحة الرئيسية بأن الترحيب انتهى
// //   };

// //   if (!showWelcome) return null; // إخفاء المكون بالكامل

// //   return (
// //      <>
// //      {/* <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 p-6 z-50"> */}
// //       {/* <div className="bg-white p-6 rounded-lg shadow-lg text-center"> */}
// //         {/* <h1 className="text-3xl font-bold text-blue-600">Welcome to TaskMaster</h1> */}
       
// //         {user && (
// //           <div className="mt-4 bg-green-100 p-4 rounded-lg shadow-md">
// //             <p className="text-gray-700 text-lg" style={{textAlign:"center"}}>
// //               Hello, <span className="font-bold text-blue-500">{user.email}</span> 👋
// //             </p>
// //             <button
// //               onClick={handleCloseMessage}
// //               className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
// //             >
// //               OK
// //             </button>
// //           </div>
// //         )}
// //       {/* </div> */}
// //     {/* </div> */}</>
// //   );
// // };

// // export default Welcome;
// import { useEffect, useState } from "react";
// import { auth } from "../../firebase"; // تأكد من استيراد Firebase بشكل صحيح
// import Swal from "sweetalert2";

// const Welcome = ({ onWelcomeComplete }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // التحقق مما إذا كان المستخدم مسجل الدخول
//     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         // إظهار رسالة الترحيب باستخدام SweetAlert
//         Swal.fire({
//           title: `Welcome, ${currentUser.email}! 👋`,
//           text: "We are glad to have you back!",
//           icon: "success",
//           confirmButtonText: "OK",
//           background: '#fff', // تحديد لون الخلفية
//           confirmButtonColor: '#007bff', // لون الزر
//           customClass: {
//             title: 'text-2xl font-bold text-center text-blue-600', // تخصيص النص العنوان
//             text: 'text-lg text-center text-gray-700', // تخصيص النص
//             confirmButton: 'px-6 py-3 rounded-lg shadow-md', // تخصيص الزر
//           }
//         }).then(() => {
//           onWelcomeComplete(); // إبلاغ الصفحة الرئيسية بأن الترحيب انتهى
//         });
//       }
//     });

//     return () => unsubscribe(); // تنظيف الاشتراك عند إلغاء تحميل المكون
//   }, [onWelcomeComplete]);

//   return null; // لا حاجة لعرض أي مكون آخر
// };

// export default Welcome;
import { useEffect, useState } from "react";
import { auth } from "../../firebase"; // تأكد من استيراد Firebase بشكل صحيح
import Swal from "sweetalert2";

const Welcome = ({ onWelcomeComplete }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // التحقق مما إذا كان المستخدم مسجل الدخول
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // إظهار رسالة الترحيب باستخدام SweetAlert
        Swal.fire({
          title: `Welcome, ${currentUser.email}! 👋`,
          text: "We are glad to have you back!",
          icon: "success",
          confirmButtonText: "OK",
          background: '#fff', // تحديد لون الخلفية
          confirmButtonColor: '#007bff', // لون الزر
          customClass: {
            title: 'text-2xl font-bold text-center text-blue-600', // تخصيص النص العنوان
            text: 'text-lg text-center text-gray-700', // تخصيص النص
            confirmButton: 'px-6 py-3 rounded-lg shadow-md', // تخصيص الزر
          },
          timer: 1500, // تحديد الوقت الذي ستظل فيه الرسالة ظاهرة (1.5 ثانية)
          timerProgressBar: true, // إظهار شريط التقدم
        }).then(() => {
          onWelcomeComplete(); // إبلاغ الصفحة الرئيسية بأن الترحيب انتهى
        });
      }
    });

    return () => unsubscribe(); // تنظيف ال
  }, [onWelcomeComplete]);

  return null; // لا حاجة لعرض أي مكون آخر
};

export default Welcome;
