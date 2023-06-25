import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const { logout } = useAppContext();

  // const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  function handleClick() {
    setOpenMenu((prevState) => !prevState);
  }

  return (
    <header className="w-full h-[60px] md:h-[80px] bg-[#ecfdf5] border-b-2 border-[#10b981] flex md:gap-20 lg:gap-[150px] justify-between px-3 md:px-[200px] items-center fixed top-0 left-0 shadow-md md:shadow-none z-10">
      <Link to="/dashboard">
        <div className="flex gap-2 items-center">
          <img
            alt=""
            src="/images/logo.png"
            className="w-10 h-10 md:w-[50px] md:h-[50px]"
          />
          <h1 className="text-[.85rem] md:text-[1.75rem] font-medium md:font-bold">
            EnrollEase
          </h1>
        </div>
      </Link>
      <img
        onClick={handleClick}
        alt=""
        src="/images/icons8-menu-30.png"
        className="w-7 h-7 block md:hidden"
      />
      <ul className="gap-5 items-center hidden md:flex">
        {/* <Link to="/about">
          <li className="hover:text-[#10b981] cursor-pointer">About</li>
        </Link> */}
        <li>
          <button
            onClick={logout}
            className="px-5 py-2 bg-[#10b981] uppercase text-[.85rem] text-white font-medium hover:bg-[#10b981]/70"
          >
            logout
          </button>
        </li>
      </ul>

      {/* mobile dropdown */}
      {openMenu && (
        <div className="w-full h-[100vh] z-[200] bg-black/80 fixed top-0 left-0 lg:hidden">
          <img
            className="w-[30px] h-[30px] cursor-pointer mr-[25px] absolute top-4 right-0 text-white"
            alt=""
            src="/images/icons8-close-50.png"
            onClick={() => {
              handleClick();
            }}
          />
          <ul className="slide float-right w-full h-[150px] bg-[#10b981] py-10 text-white gap-3 items-center md:hidden flex flex-col">
            {/* <Link
              onClick={() => {
                handleClick();
              }}
              to="/about"
            >
              <li className="py-2 border-b border-white/50">About</li>
            </Link> */}

            <li
              onClick={() => {
                handleClick();
                logout();
              }}
              className="py-2 uppercase"
            >
              Log Out
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
