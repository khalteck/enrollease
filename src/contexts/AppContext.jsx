import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase-config";

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
const AppContextProvider = ({ children }) => {
  const location = useLocation();
  let currentPage = location.pathname;

  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [loader, setLoader] = useState(false);

  const [validateErr, setValidateErr] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValidateErr("");
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const [regSuccess, setRegSuccess] = useState(false);

  async function register() {
    try {
      setLoader(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData?.email,
        formData?.password
      );

      const judgesRef = doc(db, "users", user.uid);
      await setDoc(judgesRef, { ...formData });

      if (user?.uid) {
        navigate("/login");
        setRegSuccess(true);
        setTimeout(() => {
          setRegSuccess(false);
          setFormData({
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            password: "",
          });
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  }

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setValidateErr("");
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const [loginSuccess, setLoginSuccess] = useState(false);

  async function login() {
    try {
      setLoader(true);
      const { user } = await signInWithEmailAndPassword(
        auth,
        loginData?.email,
        loginData?.password
      );

      if (user?.uid) {
        navigate("/dashboard");
        setLoginSuccess(true);
        setTimeout(() => {
          setLoginSuccess(false);
          setLoginData({
            email: "",
            password: "",
          });
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  }

  const [logoutSuccess, setLogoutSuccess] = useState(false);

  async function logout() {
    try {
      setLoader(true);
      await auth.signOut();
      setLogoutSuccess(true);
      setTimeout(() => {
        setLogoutSuccess(false);
      }, 3000);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  }

  return (
    <AppContext.Provider
      value={{
        currentPage,
        loader,
        validateErr,
        formData,
        handleChange,
        setValidateErr,
        register,
        login,
        handleLoginChange,
        regSuccess,
        loginSuccess,
        loginData,
        logoutSuccess,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
