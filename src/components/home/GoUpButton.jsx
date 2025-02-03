import React, { useState, useEffect } from "react";

const GoUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // دالة لتحديد رؤية الزر عند التمرير
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // إضافة مستمع للتمرير
    window.addEventListener("scroll", toggleVisibility);

    // تنظيف مستمع التمرير عند إلغاء تحميل المكون
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // دالة للتمرير إلى الأعلى عند الضغط على الزر
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // التمرير السلس
    });
  };

  return (
    isVisible && (
      <a
        href="#"
        className="go-up fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        onClick={scrollToTop}
      >
        <i className="fas fa-angle-double-up fa-2x"></i>
      </a>
    )
  );
};

export default GoUpButton;