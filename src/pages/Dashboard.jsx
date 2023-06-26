import { useState } from "react";
import CourseTable from "../components/CourseTable";
import Header from "../components/Header";
import Toast from "../components/Toast";
import { useAppContext } from "../contexts/AppContext";
import ScrollToTop from "../ScrollToTop";
import courseData from "../data/course.json";
import { useNavigate } from "react-router-dom";
import MyCoursesTable from "../components/MyCoursesTable";
// import html2pdf from "html2pdf.js";
// import html2canvas from "html2canvas";

const Dashboard = () => {
  const { loginSuccess, user, selectedCourses, setSelectedCourses, userData } =
    useAppContext();

  const [openDetails, setOpenDetails] = useState(false);
  const [currentCourse, setcurrentCourse] = useState("");

  function openMod(name) {
    setOpenDetails(true);

    const course = courseData?.filter((item) => {
      return item?.name === name;
    })[0];
    setcurrentCourse(course);
  }

  function closeMod() {
    setOpenDetails(false);
  }

  const navigate = useNavigate();

  function linkToPayment() {
    navigate("/payment");
  }

  console.log("userData", userData);

  return (
    <>
      <Header />
      {loginSuccess && (
        <div className="w-[300px]">
          <Toast message="Login successfully" />
        </div>
      )}
      <main className="pt-[60px] pb-[100px] md:pt-[80px] bg-[#ecfdf5]/20">
        {!userData?.paid && (
          <section className="px-3 md:px-[200px] ">
            <h1 className="font-medium text-[1.25rem] md:text-[1.75rem] text-center mt-8 uppercase">
              Course catalogue
            </h1>
            <p className="mt-7 tracking-wider text-black/80 text-[1rem] md:text-[1.1rem]">
              Hello {user?.displayName},<br /> Check out the available courses
              on the course catalog, please select the courses you wish to
              enroll in.
            </p>
            <div className="w-full overflow-x-auto my-7 py-5">
              <div className="w-full min-w-[900px]">
                <CourseTable
                  openMod={openMod}
                  selectedCourses={selectedCourses}
                  setSelectedCourses={setSelectedCourses}
                />
              </div>
            </div>

            {selectedCourses?.length > 0 && (
              <button
                onClick={linkToPayment}
                className="px-8 py-2 bg-[#10b981] uppercase text-[.85rem] text-white font-medium hover:bg-[#10b981]/70 rounded-md"
              >
                Enroll
              </button>
            )}
          </section>
        )}

        {userData?.paid && (
          <section className="px-3 md:px-[200px] ">
            <h1 className="font-medium text-[1.25rem] md:text-[1.75rem] text-center mt-8 uppercase">
              My courses
            </h1>
            <p className="mt-7 tracking-wider text-black/80 text-[1rem] md:text-[1.1rem]">
              Hello {user?.displayName},<br /> Check out the courses you are
              enrolled for.
            </p>
            <div id="card" className="w-full overflow-x-auto my-7 py-5">
              <div className="w-full min-w-[900px]">
                <MyCoursesTable
                  openMod={openMod}
                  selectedCourses={selectedCourses}
                  setSelectedCourses={setSelectedCourses}
                  userData={userData}
                />
              </div>
            </div>

            {selectedCourses?.length > 0 && !userData?.paid && (
              <button
                onClick={linkToPayment}
                className="px-8 py-2 bg-[#10b981] uppercase text-[.85rem] text-white font-medium hover:bg-[#10b981]/70 rounded-md"
              >
                Enroll
              </button>
            )}
          </section>
        )}

        <section className="px-3 md:px-[200px] ">
          <h1 className="font-medium text-[1.25rem] md:text-[1.5rem] text-center mt-8 uppercase">
            Payment
          </h1>

          <div
            id="card"
            className="w-full my-7 py-5 border border-[#10b981] rounded-lg p-3"
          >
            <p>
              Total Paid:{" "}
              <span className="text-[1.5rem] font-bold">
                {userData?.amount_paid} Naira
              </span>
            </p>
          </div>

          {/* <button
            onClick={linkToPayment}
            className="px-8 py-2 bg-[#10b981] uppercase text-[.85rem] text-white font-medium hover:bg-[#10b981]/70 rounded-md"
          >
            Download PDF
          </button> */}
        </section>
      </main>

      {openDetails && (
        <div className="w-full h-screen fixed top-0 left-0 bg-[#10b981]/70 flex justify-center items-center z-10 p-3">
          <div className="w-[500px] min-h-[200px] bg-white rounded-lg p-4 relative scale">
            <img
              className="w-[20px] h-[20px] cursor-pointer absolute top-2 right-2 text-black/80"
              alt=""
              src="/images/icons8-close-50.png"
              onClick={() => {
                closeMod();
              }}
            />

            <h1 className="text-center uppercase pb-2 border-b border-black/30">
              {currentCourse?.name}
            </h1>

            <p className="mt-7 tracking-wider text-black/80 text-[1rem]">
              <span className="font-bold"> Desription:</span>{" "}
              {currentCourse?.description}
            </p>

            <p className="mt-7 tracking-wider text-black/80 text-[1rem]">
              <span className="font-bold"> Prerequisites:</span>{" "}
              {currentCourse?.prerequisites}
            </p>

            <p className="text-black/60 text-[.75rem] mt-8">
              Check the checkbox on this course row to select it
            </p>
          </div>
        </div>
      )}

      <ScrollToTop />
    </>
  );
};

export default Dashboard;
