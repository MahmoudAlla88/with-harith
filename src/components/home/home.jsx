import Landing from "./Landing";
import Navbar from "./Navbar";
import Features from "./features";
import Footer from "./footer";
import Services from "./services";
import Wellcome from "./wellcome";
import WorkSteps from "./workstep";


const Home = () => {
  return (
    <>
    
      <Navbar />
      <Wellcome/>
      {/* <main className="container mx-auto px-4"> */}
        <Landing/>
        <Features />
      <WorkSteps/>
      <Services/>
      {/* </main> */}
     <Footer/>
    </>
  );
};

export default Home;