// import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAppContext } from "../contexts/AppContext";
import ScrollToTop from "../ScrollToTop";

const Homepage = () => {
  const navigate = useNavigate();

  const { loader } = useAppContext();

  function link() {
    navigate("/about");
  }

  return (
    <>
      {/* <Header /> */}
      {loader && <Loader />}

      <main className="w-full h-screen overflow-y-auto bg-[#ecfdf5] flex md:flex-row flex-col">
        <div className="w-full md:w-[40%] h-[300px] md:h-full bg-hero bg-cover">
          <div className="w-full h-full bg-[#10b981]/70 p-3 md:p-10 text-white flex items-center">
            <div className="flex gap-2 items-center absolute top-3 left-3 md:top-10 md:left-10">
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
                About
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[60%] md:h-full bg-[#ecfdf5] flex flex-col justify-center pb-8 p-3 md:p-10 items-center text-black/50 overflow-y-auto">
          <div className="w-full flex flex-col gap-0 md:gap-4 h-fit my-5">
            <Link to="/register">
              <button className="w-full md:w-[350px] h-[100px] uppercase px-5 py-2 md:px-12 md:py-3 font-bold bg-[#10b981] text-white border border-white hover:bg-[#10b981]/70 rounded-md mt-3">
                create an account
              </button>
            </Link>
            <Link to="/login">
              <button className="w-full md:w-[350px] h-[100px] uppercase px-5 py-2 md:px-12 md:py-3 font-bold bg-[#10b981] text-white border border-white hover:bg-[#10b981]/70 rounded-md mt-3">
                sign in
              </button>
            </Link>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </>
  );
};

export default Homepage;
