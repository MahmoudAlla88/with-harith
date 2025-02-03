// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./Articles.css";
// import Navbar from '../components/home/Navbar'; 
// import Footer from '../components/home/footer';
// const Articles = () => {
//   const [articles, setArticles] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const response = await axios.get(
//           "https://react-project-67a69-default-rtdb.firebaseio.com/articles.json"
//         );

//         if (response.data) {
//           const articlesArray = Object.entries(response.data)
//             .map(([id, article]) => ({ id, ...article })) // إضافة الـ id
//             .filter((article) => article && article.title);

//           setArticles(articlesArray);
//         } else {
//           setError("No data available");
//         }
//       } catch (err) {
//         setError("Error fetching data: " + err.message);
//         console.error(err);
//       }
//     };

//     fetchArticles();
//   }, []);

//   return (
//     <>
//     <Navbar/>
//     <div className="articles-container">
//       <h2>The most important articles related to our work</h2>
//       {error && <p className="error-message">{error}</p>}
//       <div className="articles-list">
//         {articles.length > 0 ? (
//           articles.map((article) => (
//             <div key={article.id} className="article-card">
//                    {article.image && <img src={article.image} alt={article.title} />}
//               <h3>{article.title}</h3>
//               <p>{article.description}</p>
//               <Link to={`/article/${article.id}`} className="read-more">
//                 Read More
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p>Loading articles...</p>
//         )}
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default Articles;


import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Articles.css";
import Navbar from '../components/home/Navbar'; 
import Footer from '../components/home/footer';
const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://react-project-67a69-default-rtdb.firebaseio.com/articles.json"
        );
        if (response.data) {
          const articlesArray = Object.entries(response.data)
            .map(([id, article]) => ({ id, ...article }))
            .filter((article) => article && article.title);
          setArticles(articlesArray);
          setFilteredArticles(articlesArray);
        } else {
          setError("No data available");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
        console.error(err);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [searchQuery, articles]);

  return (
    <> <Navbar/> 
    <div className="page-container">
      <div className="articles-container">
        <h2>The most important articles related to our work</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="search-add-container">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <Link to="/add-article" className="add-article-button">
            Add Article
          </Link>
        </div>

        <div className="articles-list">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div key={article.id} className="article-card">
                {article.image && (
                  <img src={article.image} alt={article.title} />
                )}
                <h3>{article.title}</h3>
                <Link to={`/article/${article.id}`} className="read-more">
                  Read More
                </Link>
              </div>
            ))
          ) : (
            <p>No articles found</p>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Articles;