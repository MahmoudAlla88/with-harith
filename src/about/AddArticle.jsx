import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddArticle.css";

const AddArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!title || !description || !image) {
      setError("Please fill all fields");
      return;
    }

    try {
      // إرسال البيانات إلى Firebase
      await axios.post(
        "https://react-project-67a69-default-rtdb.firebaseio.com/articles.json",
        {
          title,
          description,
          image,
        }
      );
      setSuccess(true);

      // إعادة توجيه المستخدم إلى صفحة المقالات
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError("Failed to add the article: " + err.message);
    }
  };

  return (
    <div className="add-article-container">
      <h2>Add a New Article</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Article added successfully!</p>}

      <form className="add-article-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter article title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Enter article description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">Add Article</button>
      </form>
    </div>
  );
};

export default AddArticle;