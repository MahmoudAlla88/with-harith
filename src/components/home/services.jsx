
import "./Master.css";
const Services = () => {
    return (
      <section className="container text-center my-5">
        <h2 className="mb-4">Our Services</h2>
        <div className="row">
  
          {/* Service 1: Task Management */}
          <div className="col-md-4">
            <div className="card p-4 shadow">
              <i className="fas fa-tasks fa-3x text-primary mb-3"></i>
              <h3>Task Management</h3>
              <p>Organize, prioritize, and track your tasks efficiently.</p>
            </div>
          </div>
  
          {/* Service 2: Team Collaboration */}
          <div className="col-md-4">
            <div className="card p-4 shadow">
              <i className="fas fa-users fa-3x text-success mb-3"></i>
              <h3>Team Collaboration</h3>
              <p>Work with your team, assign tasks, and leave comments.</p>
            </div>
          </div>
  
          {/* Service 3: Deadline Reminders */}
          <div className="col-md-4">
            <div className="card p-4 shadow">
              <i className="fas fa-clock fa-3x text-danger mb-3"></i>
              <h3>Deadline Reminders</h3>
              <p>Get timely notifications and never miss a deadline.</p>
            </div>
          </div>
  
          {/* Service 4: File Attachments */}
          <div className="col-md-4 mt-4">
            <div className="card p-4 shadow">
              <i className="fas fa-file-upload fa-3x text-warning mb-3"></i>
              <h3>Add Tasks</h3>
              <p>Upload and add task to your tasks effortlessly.</p>
            </div>
          </div>
  
          {/* Service 5: Reports & Insights */}
          <div className="col-md-4 mt-4">
            <div className="card p-4 shadow">
              <i className="fas fa-chart-line fa-3x text-info mb-3"></i>
              <h3>Reports & Insights</h3>
              <p>Analyze performance and track progress with reports.</p>
            </div>
          </div>
  
          {/* Service 6: Secure Access */}
          <div className="col-md-4 mt-4">
            <div className="card p-4 shadow">
              <i className="fas fa-lock fa-3x text-secondary mb-3"></i>
              <h3>Secure Access</h3>
              <p>Protect your data with advanced security measures.</p>
            </div>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default Services;
  