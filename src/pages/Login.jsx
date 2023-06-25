// import Header from "../components/Header";
import ScrollToTop from "../ScrollToTop";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useState } from "react";
import Loader from "../components/Loader";
import Toast from "../components/Toast";

const Login = () => {
  const {
    loginData,
    setValidateErr,
    handleLoginChange,
    validateErr,
    login,
    loader,
    regSuccess,
    logoutSuccess,
  } = useAppContext();

  const navigate = useNavigate();

  function link() {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginData?.email && loginData?.password) {
      await login();
    } else {
      setValidateErr("Please fill all fields!");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <>
      {/* <Header /> */}
      {loader && <Loader />}
      {regSuccess && (
        <div className="w-[300px]">
          <Toast message="Registration successful" />
        </div>
      )}

      {logoutSuccess && (
        <div className="w-[300px]">
          <Toast message="Logged out successfully" />
        </div>
      )}

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
        <div className="w-full md:w-[60%] h-full bg-[#ecfdf5] flex flex-col md:justify-center py-8 px-3 md:py-10 md:px-[100px] items-center text-black/70 md:overflow-y-auto">
          <div className="w-full flex flex-col gap-0 md:gap-4 h-fit my-5">
            <h1 className="text-[1.5rem] mb-4 md:text-[1.75rem] text-center font-bold uppercase">
              Sign in
            </h1>
            <form
              onSubmit={handleSubmit}
              className="w-full md:w-[500px] mx-auto flex flex-col gap-4 items-center md:items-start"
            >
              <div className="w-full">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={loginData?.email}
                  onChange={handleLoginChange}
                  className={`w-full p-2 border outline-none rounded-lg ${
                    validateErr && !loginData?.email
                      ? "border-red-500"
                      : "border-[#10b981]"
                  }`}
                />
              </div>
              <div className="w-full relative">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={loginData?.password}
                  onChange={handleLoginChange}
                  className={`w-full p-2 border outline-none rounded-lg ${
                    validateErr && !loginData?.password
                      ? "border-red-500"
                      : "border-[#10b981]"
                  }`}
                />
                <p
                  onClick={toggleShowPassword}
                  className="absolute text-[#10b981] cursor-pointer top-8 right-3"
                >
                  {showPassword ? "Hide" : "Show"}
                </p>
              </div>

              {validateErr && (
                <p className="text-red-500 p-2 bg-red-500/20 border border-red-500 w-full rounded-lg">
                  {validateErr}
                </p>
              )}

              <p className="">
                Not registered?{" "}
                <Link to="/register" className="text-[#10b981] hover:underline">
                  Create account
                </Link>
              </p>

              <button
                onClick={(e) => handleSubmit(e)}
                className="uppercase px-5 py-2 md:px-12 md:py-3 font-bold bg-[#10b981] text-white border border-white hover:bg-[#10b981]/70 rounded-md mt-3"
              >
                Sign IN
              </button>
            </form>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </>
  );
};

export default Login;
