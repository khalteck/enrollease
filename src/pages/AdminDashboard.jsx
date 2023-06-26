import { useState } from "react";
import Header from "../components/Header";
import Toast from "../components/Toast";
import { useAppContext } from "../contexts/AppContext";
import ScrollToTop from "../ScrollToTop";
import AllSTudentTable from "../components/AllStudentTable";
import Loader from "../components/Loader";
import AllCoursesTable from "../components/AllCoursesTable";

const AdminDashboard = () => {
  const {
    loginSuccess,
    CourseformData,
    loader,
    userData,
    allUsers,
    deleteUserAccount,
    validateErr,
    handleCourseChange,
    createCourse,
    setValidateErr,
    courseAdded,
    openAddCourse,
    setOpenAddCourse,
    courseDeleted,
    deleteCourse,
    setSelectedCourse,
    selectedCourse,
    setopenDeleteCourse,
    openDeleteCourse,
  } = useAppContext();

  const filteredUsers = allUsers?.filter((item) => item?.role !== "admin");

  // console.log("selectedCourse =>", selectedCourse);

  const [openDetails, setOpenDetails] = useState(false);

  const [selectedUser, setSelectedUser] = useState("");

  function openMod() {
    setOpenDetails(true);
  }

  const enrolled = allUsers?.filter((item) => {
    return item?.paid === true;
  });

  const totalPaid = enrolled?.reduce(
    (acc, obj) => acc + Number(obj?.amount_paid),
    0
  );

  function toggleAddCourse() {
    setOpenAddCourse((prev) => !prev);
  }

  function closeMod() {
    setOpenDetails(false);
    setOpenAddCourse(false);
    setopenDeleteCourse(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      CourseformData?.name &&
      CourseformData?.description &&
      CourseformData?.prerequisites
    ) {
      await createCourse();
    } else {
      setValidateErr("Please fill all fields!");
    }
  };

  return (
    <>
      <Header />
      {loginSuccess && (
        <div className="w-[300px]">
          <Toast message="Login successfully" />
        </div>
      )}

      {courseAdded && (
        <div className="w-[300px]">
          <Toast message="Course added successfully" />
        </div>
      )}

      {courseDeleted && (
        <div className="w-[300px]">
          <Toast message="Course deleted successfully" />
        </div>
      )}

      {loader && <Loader />}

      <main className="pt-[60px] pb-[100px] md:pt-[80px] bg-[#ecfdf5]/20">
        <h1 className="font-medium text-[1.25rem] md:text-[1.75rem] text-center mt-8 uppercase">
          Admin Dashboard
        </h1>

        <section className="px-3 md:px-[200px] my-5">
          <p className="mt-7 tracking-wider text-black/80 text-[1rem] md:text-[1.25rem] font-medium mb-6">
            Hello {userData?.first_name}
          </p>
          <div className="w-full flex flex-wrap md:flex-row flex-col gap-5">
            <div className="min-w-fit w-full md:w-[350px] p-3 border-2 border-[#10b981] rounded-md flex gap-5 items-center">
              <img
                className="w-suto h-full"
                alt=""
                src="/images/icons8-users-50.png"
              />
              <div className="flex gap-2 items-center px-3 bg-[#10b981]/30 rounded-lg">
                <p className="text-[1.1rem] font-medium leading-tight">
                  Total Students:
                </p>
                <p className="text-[2rem] font-bold leading-tight">
                  {filteredUsers?.length}
                </p>
              </div>
            </div>
            <div className="min-w-fit w-full md:w-[350px] p-3 border-2 border-[#10b981] rounded-md flex gap-5 items-center">
              <img
                className="w-suto h-full"
                alt=""
                src="/images/icons8-users-50.png"
              />
              <div className="flex gap-2 items-center px-3 bg-[#10b981]/30 rounded-lg">
                <p className="text-[1.1rem] font-medium leading-tight">
                  Enrolled Students:
                </p>
                <p className="text-[2rem] font-bold leading-tight">
                  {enrolled?.length}
                </p>
              </div>
            </div>
            <div className="min-w-fit w-full md:w-[350px] p-3 border-2 border-[#10b981] rounded-md flex gap-5 items-center">
              <img
                className="w-suto h-full"
                alt=""
                src="/images/icons8-revenue-64.png"
              />
              <div className="flex gap-2 items-center px-3 bg-[#10b981]/30 rounded-lg">
                <p className="text-[1.25rem] font-medium leading-tight">
                  Total Income:
                </p>
                <p className="text-[2rem] font-bold leading-tight">
                  #{totalPaid}
                </p>
              </div>
            </div>
            {/* <div className="w-[30%] p-3 border border-[#10b981]/50 rounded-lg flex gap-3 items-center"></div> */}
          </div>
        </section>

        <section className="px-3 md:px-[200px] mt-10">
          <p className="mt-7 tracking-wider text-black/80 text-[1rem] md:text-[1.25rem] font-medium">
            All students
          </p>
          {filteredUsers?.length > 0 ? (
            <div className="w-full overflow-x-auto my-0 py-5">
              <div className="w-full min-w-[900px]">
                <AllSTudentTable
                  openMod={openMod}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-[200px] border border-[#10b981]/30 flex justify-center items-center rounded-lg text-black/70 mt-4">
              <h2>No students yet..</h2>
            </div>
          )}
        </section>

        <section className="px-3 md:px-[200px] mt-14">
          <div className="flex gap-4 md:flex-row flex-col justify-between md:items-center">
            <p className="tracking-wider text-black/80 text-[1rem] md:text-[1.25rem] font-medium">
              Manage Courses
            </p>
            <button
              onClick={toggleAddCourse}
              className="h-fit w-fit px-8 py-2 bg-[#10b981] uppercase text-[.85rem] text-white font-medium hover:bg-[#10b981]/70 rounded-md flex items-center gap-3"
            >
              Add Course
              <img className="w-4 h-4" alt="" src="/images/icons8-add-30.png" />
            </button>
          </div>
          {filteredUsers?.length > 0 ? (
            <div className="w-full overflow-x-auto my-0 py-5">
              <div className="w-full min-w-[900px]">
                <AllCoursesTable
                  openMod={openMod}
                  setopenDeleteCourse={setopenDeleteCourse}
                  setSelectedCourse={setSelectedCourse}
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-[200px] border border-[#10b981]/30 flex justify-center items-center rounded-lg text-black/70 mt-4">
              <h2>No courses yet..</h2>
            </div>
          )}
        </section>
      </main>

      {openDetails && (
        <div className="w-full h-screen fixed top-0 left-0 bg-[#10b981]/80 flex justify-center items-center z-10 p-3">
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
              {selectedUser?.first_name} {selectedUser?.last_name}
            </h1>

            <p className="mt-7 tracking-wider text-black/80 text-[1rem]">
              <span className="font-bold"> Full name:</span>{" "}
              {selectedUser?.first_name} {selectedUser?.middle_name}{" "}
              {selectedUser?.last_name}
            </p>

            <p className="mt-7 tracking-wider text-black/80 text-[1rem]">
              <span className="font-bold"> Email:</span> {selectedUser?.email}
            </p>

            <p className="mt-7 tracking-wider text-black/80 text-[1rem]">
              <span className="font-bold"> Status:</span>{" "}
              {selectedUser?.amount_paid ? "Enrolled" : "Not Enrolled"}
            </p>

            {selectedUser?.amount_paid && (
              <>
                {" "}
                <div className="mt-7 tracking-wider text-black/80 text-[1rem] flex gap-2">
                  <span className="font-bold">Courses Enrolled:</span>
                  <ul>
                    {" "}
                    {selectedUser?.selected_courses?.map((item, index) => {
                      return <li key={index}>{item?.name}</li>;
                    })}
                  </ul>
                </div>
                <p className="mt-7 tracking-wider text-black/80 text-[1rem]">
                  <span className="font-bold"> Paid:</span>{" "}
                  {selectedUser?.amount_paid} Naira
                </p>
              </>
            )}
            <div className="text-right">
              <button
                onClick={() => deleteUserAccount(selectedUser)}
                className="h-fit px-8 py-2 bg-red-500 uppercase text-[.85rem] text-white font-medium hover:bg-red-500/70 rounded-md ml-auto mt-8"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {openAddCourse && (
        <div className="w-full h-screen fixed top-0 left-0 bg-[#10b981]/80 flex justify-center items-center z-10 p-3">
          <div className="w-[500px] min-h-[200px] bg-white rounded-lg p-4 relative scale">
            <img
              className="w-[20px] h-[20px] cursor-pointer absolute top-2 right-2 text-black/80"
              alt=""
              src="/images/icons8-close-50.png"
              onClick={() => {
                closeMod();
                setValidateErr("");
              }}
            />

            <h1 className="text-center uppercase pb-2 border-b border-black/30 mb-5">
              Add Course
            </h1>

            <form className="w-full flex flex-col gap-4">
              <div className="w-full">
                <label htmlFor="name">Course Title</label>
                <input
                  type="text"
                  id="name"
                  value={CourseformData?.name}
                  onChange={handleCourseChange}
                  className={`w-full p-2 border outline-none rounded-lg ${
                    validateErr && !CourseformData?.name
                      ? "border-red-500"
                      : "border-[#10b981]"
                  }`}
                />
              </div>
              <div className="w-full">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={CourseformData?.description}
                  onChange={handleCourseChange}
                  className={`w-full p-2 border outline-none rounded-lg ${
                    validateErr && !CourseformData?.description
                      ? "border-red-500"
                      : "border-[#10b981]"
                  }`}
                />
              </div>
              <div className="w-full">
                <label htmlFor="prerequisites">Prerequisites</label>
                <input
                  type="text"
                  id="prerequisites"
                  value={CourseformData?.prerequisites}
                  onChange={handleCourseChange}
                  className={`w-full p-2 border outline-none rounded-lg ${
                    validateErr && !CourseformData?.prerequisites
                      ? "border-red-500"
                      : "border-[#10b981]"
                  }`}
                />
              </div>
              {validateErr && (
                <p className="text-red-500 p-2 bg-red-500/20 border border-red-500 w-full rounded-lg">
                  {validateErr}
                </p>
              )}
              <div className="text-right">
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  className="h-fit px-8 py-2 bg-[#10b981] uppercase text-[.85rem] text-white font-medium hover:bg-[#10b981]/80 rounded-md"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {openDeleteCourse && (
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
              {selectedCourse?.name}
            </h1>

            <p className="mt-7 tracking-wider text-black/80 text-[1rem]">
              <span className="font-bold"> Desription:</span>{" "}
              {selectedCourse?.description}
            </p>

            <p className="mt-7 tracking-wider text-black/80 text-[1rem]">
              <span className="font-bold"> Prerequisites:</span>{" "}
              {selectedCourse?.prerequisites}
            </p>

            <div className="text-right">
              <button
                onClick={() => deleteCourse(selectedCourse?.name)}
                className="h-fit px-8 py-2 bg-red-500 uppercase text-[.85rem] text-white font-medium hover:bg-red-500/70 rounded-md ml-auto mt-8"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}

      <ScrollToTop />
    </>
  );
};

export default AdminDashboard;
