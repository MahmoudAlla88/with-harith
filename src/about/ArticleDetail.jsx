// import { useParams, Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { database, ref, get } from "../firebase";
// import "./ArticleDetail.css";
// import Navbar from '../components/home/Navbar'; 
// import Footer from '../components/home/footer';
// const ArticleDetail = () => {
//   const { id } = useParams();
//   const [article, setArticle] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const articleRef = ref(database, `articles/${id}`);
//         const snapshot = await get(articleRef);
//         if (snapshot.exists()) {
//           setArticle(snapshot.val());
//         } else {
//           setError("Article not found");
//         }
//       } catch (err) {
//         setError("Error fetching article: " + err.message);
//         console.error(err);
//       }
//     };
//     fetchArticle();
//   }, [id]);

//   if (error) {
//     return <h2>{error}</h2>;
//   }

//   // if (!article) {
//   //   return <h2>Loading article...</h2>;
//   // }

//   return (
//     <>
//     <Navbar/>
//     <div className="article-detail-container">
//       {/* {article.image && <img src={article.image} alt={article.title} />} */}
//       {article && article.image && <img src={article.image} alt={article.title} />}

//       <h2>{article.title}</h2>
//       <p>{article.content}</p>
//       <Link to="/articles" className="back-button">Back to Articles</Link>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default ArticleDetail;
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// // import {ref,get ,} from "../firebase"
// const ArticleDetail = () => {
//   const { id } = useParams();
//   const [article, setArticle] = useState(null);

//   useEffect(() => {
//     // جلب المقال من API أو مصدر البيانات
//     fetch(`/api/articles/${id}`)
//       .then((res) => res.json())
//       .then((data) => setArticle(data))
//       .catch((error) => console.error("Error fetching article:", error));
//   }, [id]);

//   if (!article) {
//     return <p>Loading article...</p>; // أو وضع Spinner
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="article-detail-container">
//         {article.image && <img src={article.image} alt={article.title} />}
//         <h2>{article.title}</h2>
//         <p>{article.content}</p>
//         <Link to="/articles" className="back-button">Back to Articles</Link>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ArticleDetail;
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyCQA_rI8xPFzMvziFK7CGdk2Da1OQAAQrU",
  authDomain: "react-project-67a69.firebaseapp.com",
  projectId: "react-project-67a69",
  storageBucket: "react-project-67a69.appspot.com",
  messagingSenderId: "188068534891",
  appId: "1:188068534891:web:b7a6f07199b614564bef2e"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// الحصول على مرجع قاعدة البيانات
const database = getDatabase(app);

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { database, ref, get } from "../firebase";
import "./ArticleDetail.css";
import Navbar from '../components/home/Navbar'; 
import Footer from '../components/home/footer';
const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleRef = ref(database, `articles/${id}`);

        const snapshot = await get(articleRef);
        if (snapshot.exists()) {
          setArticle(snapshot.val());
        } else {
          setError("Article not found");
        }
      } catch (err) {
        setError("Error fetching article: " + err.message);
        console.error(err);
      }
    };
    fetchArticle();
  }, [id]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!article) {
    return <h2>Loading article...</h2>;
  }

  return (
    <><Navbar/>
    <div className="article-detail-container">
      {article.image && <img src={article.image} alt={article.title} />}
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <Link to="/articles" className="back-button">Back to Articles</Link>
    </div>
    <Footer/>
    </>
  );
};

export default ArticleDetail;