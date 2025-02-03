import { useState } from "react";
import { database, ref, set } from "../firebase"; 
import './ContactUs.css';
import Navbar from '../components/home/Navbar'; 
import Footer from '../components/home/footer';
const ContactUs = () => {
  // حالة المدخلات
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // دالة لإرسال البيانات إلى Firebase عند إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && message) {
      const formData = {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      };

      // إرسال البيانات إلى Firebase
      const formRef = ref(database, "contact-us/" + new Date().getTime()); // ID فريد
      set(formRef, formData)
        .then(() => {
          setStatus("Your message has been sent successfully!");
          // إعادة تعيين المدخلات
          setName("");
          setEmail("");
          setMessage("");
        })
        .catch((error) => {
          setStatus("Error sending message: " + error.message);
        });
    } else {
      setStatus("Please fill out all fields.");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="contact-us-container">
      <div className="contact-form-container">
        <div className="contact-header">
          <h2>Get in touch</h2>
          <p>We are here for you! How can we help?</p>
        </div>
        <div className="contact-content">
          <div className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="4"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button onClick={handleSubmit}>Submit</button>
            {status && <p className="status-message">{status}</p>}
          </div>
          <div className="contact-image">
            <img src="src/about/088c099c81191b734e0db14f0e253142.jpg" alt="Contact Us" />
          </div>
        </div>
        <div className="contact-details">
          <div>
            <span className="material-icons">location_on</span>
            <p>Jordan - Amman</p>
          </div>
          <div>
            <span className="material-icons">phone</span>
            <p>+269 782314561</p>
          </div>
          <div>
            <span className="material-icons">email</span>
            <p>bestteam@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;




