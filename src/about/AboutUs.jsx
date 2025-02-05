import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-gray-900">About Us</h2>
            {/* <p className="text-gray-600 mt-4 text-xl">
              We are a team of creative professionals dedicated to delivering the best designs and solutions.
            </p> */}
          </div>

          <div className="md:flex md:items-start md:gap-12">
  <div className="md:w-1/2">
    <p className="text-gray-700 text-lg leading-relaxed">
      Our team brings together experienced designers, developers, and innovators who work tirelessly
      to create exceptional content and designs. We are driven by creativity and always aim to exceed
      expectations with each project.
    </p>
    <p className="text-gray-700 text-lg leading-relaxed mt-4">
      Our mission is to provide high-quality designs and resources that cater to diverse industries and
      help businesses succeed in the digital world.
    </p>
  </div>
  <div className="md:w-1/2 flex justify-center">
    <img
      src="src/about/pexels-angela-roma-7318849.jpg"
      alt="About Us"
      className="rounded-lg shadow-lg w-full md:max-w-md"
    />
  </div>
</div>


          {/* Values Section */}
          <div className="text-center mt-16">
            <h3 className="text-4xl font-bold text-gray-900">Our Values</h3>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Creativity", color: "text-blue-600", text: "We believe in pushing boundaries to create innovative solutions." },
                { title: "Quality", color: "text-green-600", text: "We ensure top-notch quality in every project we deliver." },
                { title: "Collaboration", color: "text-purple-600", text: "Teamwork is the core of our success." },
              ].map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
                  <h4 className={`text-2xl font-semibold ${value.color}`}>{value.title}</h4>
                  <p className="text-gray-600 mt-3 text-lg">{value.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Team Section */}
          <div className="mt-20">
            <h3 className="text-4xl font-bold text-center text-gray-900">Our Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mt-12">
              {[
                { name: "Raghad Kamal", role: "Scrum Master", image: "src/about/women.png" },
                { name: "Marya Banyan", role: "Project Owner", image: "src/about/women.png" },
                { name: "Ahlam Almomani", role: "Quality Assurance", image: "src/about/women.png" },
                { name: "Hareth Jundi", role: "Web Developer", image: "src/about/download.png" },
                { name: "Mahmoud Suliman", role: "Web Developer", image: "src/about/download.png" },
              ].map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 mx-auto rounded-full border-4 border-gray-300"
                  />
                  <h4 className="text-xl font-semibold mt-5 text-gray-900">{member.name}</h4>
                  <p className="text-gray-600 text-lg">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
