/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
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
    paid: false,
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

      // Set display name for the user
      await updateProfile(user, {
        displayName: `${formData?.first_name} ${formData?.last_name}`,
      });

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
            paid: false,
          });
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      error?.message === "Firebase: Error (auth/email-already-in-use)." &&
        setValidateErr("Email already in use");
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
      error?.message === "Firebase: Error (auth/user-not-found)." &&
        setValidateErr("Invalid Login Credentials");
    } finally {
      setLoader(false);
    }
  }

  const [user, setUser] = useState({});
  useEffect(() => {
    // Add an event listener to the Firebase auth state change
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log("Current User:", user);
        setUser(user);
      } else {
        console.log("No user signed in");
      }
    });

    // Clean up the event listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const [logoutSuccess, setLogoutSuccess] = useState(false);

  async function logout() {
    try {
      setLoader(true);
      await auth.signOut();
      localStorage.removeItem("userData");
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

  useEffect(() => {
    setValidateErr("");
  }, [currentPage]);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user?.uid) {
      async function getUserData() {
        try {
          const docRef = doc(db, "users", user?.uid);
          const docSnap = await getDoc(docRef);

          setUserData(docSnap.data());
          localStorage.setItem("userData", JSON.stringify(docSnap.data()));
          console.log("User Data:", userData);
          return userData;
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      getUserData();
    }
  }, [user]);

  const [selectedCourses, setSelectedCourses] = useState([]);

  async function setPaid(txn, price) {
    try {
      const docRef = doc(db, "users", user?.uid);
      const updatedData = {
        paid: true,
        selected_courses: selectedCourses,
        amount_paid: price,
        txn_ref: txn,
      };

      await updateDoc(docRef, updatedData);

      setUserData(updatedData);
      localStorage.setItem("userData", JSON.stringify(updatedData));
      console.log("User Data:", updatedData);
      return updatedData;
    } catch (error) {
      console.error("Error updating user data:", error);
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
        user,
        setSelectedCourses,
        selectedCourses,
        userData,
        setPaid,
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
