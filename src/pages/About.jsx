// import Header from "../components/Header";
import ScrollToTop from "../ScrollToTop";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  function link() {
    navigate("/");
  }

  return (
    <>
      {/* <Header /> */}
      <main className="w-full h-screen overflow-y-auto flex md:flex-row flex-col">
        <div className="w-full md:w-[40%] h-[300px] md:h-full bg-hero bg-cover">
          <div className="w-full md:h-full h-[220px] bg-[#10b981]/70 p-3 md:p-10 text-white flex items-center">
            <div className="flex gap-2 items-center absolute top-3 left-3 md:top-10 md:left-10 bg-[#10b981]/50 md:bg-transparent rounded-lg px-3 md:px-0">
              <img
                alt=""
                src="/images/logo.png"
                className="w-10 h-10 md:w-[50px] md:h-[50px]"
              />
              <h1 className="font-bold text-white text-[1.25rem] md:text-[2rem]">
                EnrollEase
              </h1>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="tracking-wider text-[1.25rem] md:text-[2.75rem] font-medium first-section-text uppercase">
                Streamlined
                <br /> Course Registration System
              </p>
              <button
                onClick={link}
                className="uppercase px-5 py-1 md:px-12 md:py-3 font-bold text-[#10b981] border border-white bg-white hover:bg-white/80 rounded-md mt-3"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[60%] md:h-full bg-[#ecfdf5] flex flex-col py-12 px-3 md:px-16 md:py-14 items-center text-black/60 md:overflow-y-auto">
          <h1 className="text-[1.75rem] text-center font-bold">
            About EnrollEase
          </h1>
          <p className="mt-7 tracking-wider text-black/80 text-[1.2rem]">
            EnrollEase is an innovative project designed to simplify the course
            registration process for educational institutions, including
            universities, colleges, and training centers. Our aim is to enhance
            efficiency and convenience by providing a digital solution that
            replaces traditional paper-based registration forms and reduces
            administrative workloads.
            <br />
            <br /> The inspiration behind EnrollEase stems from the growing
            popularity of online learning and distance education. As the demand
            for flexible course enrollment from students around the world
            continues to rise, educational institutions are embracing technology
            to facilitate the registration process and cater to their needs.
            <br />
            <br /> Our primary goal is to gather essential information from
            students effectively through our online course registration form. By
            utilizing EnrollEase, students can easily provide their name,
            contact details, course preferences, and payment information. These
            details enable institutions to process registrations promptly,
            assign courses to students, and keep them updated with important
            information regarding their chosen courses.
            <br />
            <br /> EnrollEase revolutionizes the way educational institutions
            manage their course registrations, ensuring a smooth and streamlined
            experience for both students and administrators. With our
            user-friendly interface and efficient functionality, we prioritize
            the convenience and satisfaction of all users involved in the
            registration process.
            <br />
            <br /> EnrollEase is dedicated to empowering students on their
            educational journey. Our project strives to make the course
            registration process accessible, efficient, and enjoyable. Join us
            today and experience the convenience and effectiveness of EnrollEase
            in simplifying your course registration experience.
          </p>
        </div>
      </main>
      <ScrollToTop />
    </>
  );
};

export default About;
