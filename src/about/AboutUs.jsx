import './AboutUs.css';
import Navbar from '../components/home/Navbar'; 
import Footer from '../components/home/footer';
const AboutUs = () => {
    return (
     <>
     <Navbar/>
      <div className="about-us-container">
        <div className="about-us-content">
          <div className="about-header">
            <h2>About Us</h2>
            <p>We are a team of creative professionals dedicated to delivering the best designs and solutions.</p>
          </div>
          <div className="about-content">
            <div className="about-description">
              <p>
                Our team brings together experienced designers, developers, and innovators who work tirelessly
                to create exceptional content and designs. We are driven by creativity and always aim to exceed
                expectations with each project.
              </p>
              <p>
                Our mission is to provide high-quality designs and resources that cater to diverse industries and
                help businesses succeed in the digital world.
              </p>
            </div>
            <div className="about-image">
              <img src="src/about/pexels-photo-3184306.jpeg" alt="About Us" />
            </div>
          </div>
        </div>
        <div className="about-team">
          <h3>Our Team</h3>
          <div className="team-members">
            <div className="team-member">
              <img src="src/about/women.png" alt="Team Member 1" />
              <h4>Raghad Kamal</h4>
              <p>Scrum Master</p>
            </div>
            <div className="team-member">
              <img src="src/about/women.png" alt="Team Member 2" />
              <h4>Marya Banyan</h4>
              <p>Project owner</p>
            </div>
            <div className="team-member">
              <img src="src/about/women.png" alt="Team Member 3" />
              <h4>Ahlam Almomani</h4>
              <p>Quality assurance</p>
              </div>
              <div className="team-member">
              <img src="src/about/download.png" alt="Team Member 4" />
              <h4>Hareth Jundi</h4>
              <p>Web Developer</p>
            </div>
            <div className="team-member">
              <img src="src/about/download.png" alt="Team Member 5" />
              <h4>Mahmoud Suliman</h4>
              <p>Web Developer</p>
            </div>
            </div>
          </div>
        </div>
        <Footer/>
        </>
    );
  };
  
  export default AboutUs;
  