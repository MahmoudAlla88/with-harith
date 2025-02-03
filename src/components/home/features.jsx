
import "./Master.css";
const Features = () => {
    return (
      <section className="features" id="features">
        <h2 className="main-title">Key Features</h2>
        <div className="container">
          
          {/* Feature 1: Task Organization */}
          <div className="box quality">
            <div className="img-holder">
              <img decoding="async" src="src/components/img/pexels-photo-7439127.jpeg" alt="Task Organization" />
            </div>
            <h2>Task Organization</h2>
            <p>
              Easily manage and categorize your tasks with intuitive lists and filters for better workflow efficiency.
            </p>
            <a href="https://focuskeeper.co/glossary/what-is-task-organization/">Learn More</a>
          </div>
  
          {/* Feature 2: Deadline Tracking */}
          <div className="box time">
            <div className="img-holder">
              <img decoding="async" src="src/components/img/pexels-photo-29218404.webp" alt="Deadline Tracking" />
            </div>
            <h2>Deadline Tracking</h2>
            <p>
              Set due dates and receive reminders to stay on top of your important tasks and deadlines.
            </p>
            <a href="https://focuskeeper.co/glossary/what-is-deadline-tracking/">Learn More</a>
          </div>
  
          {/* Feature 3: Team Collaboration */}
          <div className="box passion">
            <div className="img-holder">
              <img decoding="async" src="src/components/img/pexels-photo-7439137.webp" alt="Team Collaboration" />
            </div>
            <h2>Team Collaboration</h2>
            <p>
              Work together with your team by assigning tasks, leaving comments, and tracking progress in real-time.
            </p>
            <a href="https://focuskeeper.co/glossary/what-is-team-collaboration/">Learn More</a>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default Features;
  