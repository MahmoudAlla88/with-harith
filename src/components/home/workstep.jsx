import './Master.css'


const WorkSteps = () => {
    return (
      <section className="work-steps" id="work-steps">
        <h2 className="main-title">How It Works?</h2>
        <div className="container">
          <img decoding="async" src="\src\components\img\original-e001a63cb4ecf843625a510f7f42970e.png" alt="Work Steps" className="image" />
          <div className="info">
            
            {/* Step 1: Login */}
            <div className="box">
              <img decoding="async" src="src/components/img/login.png" alt="Login" />
              <div className="text">
                <h3>Login</h3>
                <p>
                  Sign in to your account to access your personalized task dashboard and manage your work efficiently.
                </p>
              </div>
            </div>
  
            {/* Step 2: Add Tasks */}
            <div className="box">
              <img decoding="async" src="src/components/img/add.png" alt="Add Tasks" />
              <div className="text">
                <h3>Add Tasks</h3>
                <p>
                  Create new tasks by providing details such as title, description, priority level, and due date.
                </p>
              </div>
            </div>
  
            {/* Step 3: Set Priorities */}
            <div className="box">
              <img decoding="async" src="src/components/img/priority.png" alt="Set Priorities" />
              <div className="text">
                <h3>Set Priorities</h3>
                <p>
                  Assign priority levels (High, Medium, Low) to your tasks to focus on the most urgent ones first.
                </p>
              </div>
            </div>
  
            {/* Step 4: Track Progress */}
            <div className="box">
              <img decoding="async" src="src/components/img/development.png" alt="Track Progress" />
              <div className="text">
                <h3>Track Progress</h3>
                <p>
                  Monitor the status of your tasks, update their progress, and mark them as completed when done.
                </p>
              </div>
            </div>
  
          </div>
        </div>
      </section>
    );
  };
  
  export default WorkSteps;
  