/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { ...formData, uid: user?.uid, role: "user" });

      // Set display name for the user
      await updateProfile(user, {
        displayName: `${formData?.first_name} ${formData?.last_name}`,
      });

      // Set custom claims with role "user"
      // await setCustomUserClaims(user.uid, { role: "user" });

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
        const docRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);

        const docData = docSnap.data();

        setLoginSuccess(true);
        setTimeout(() => {
          setLoginSuccess(false);
          setLoginData({
            email: "",
            password: "",
          });
        }, 3000);
        if (docData?.role === "user") {
          navigate("/dashboard");
        } else {
          navigate("/admin-dashboard");
        }
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
        // window.location.reload();
      }, 2000);
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

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || {}
  );

  useEffect(() => {
    if (user?.uid) {
      async function getUserData() {
        try {
          const docRef = doc(db, "users", user?.uid);
          const docSnap = await getDoc(docRef);

          setUserData(docSnap.data());
          localStorage.setItem("userData", JSON.stringify(docSnap.data()));
          // console.log("User Data:", userData);
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
        ...userData,
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

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      async function getAllUsers() {
        try {
          const collectionRef = collection(db, "users");
          const querySnapshot = await getDocs(collectionRef);

          const allUsersData = querySnapshot.docs.map((doc) => doc.data());

          setAllUsers(allUsersData);
          // console.log("allUsers", allUsersData);
        } catch (error) {
          console.error("Error fetching all users", error);
        }
      }

      getAllUsers();
    }
  }, [user]);

  async function deleteUserAccount(selectedUser) {
    try {
      setLoader(true);
      // const user = await getUserByEmail(auth, selectedUser?.email);

      if (selectedUser) {
        const docRef = doc(db, "users", selectedUser?.uid);
        await deleteDoc(docRef);
        console.log("User account deleted successfully");
        window.location.reload();
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error deleting user account", error);
    } finally {
      setLoader(false);
    }
  }

  const [CourseformData, setCourseFormData] = useState({
    name: "",
    description: "",
    prerequisites: "",
    price: 2500,
  });

  const handleCourseChange = (e) => {
    setValidateErr("");
    const { id, value } = e.target;
    setCourseFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const [courseAdded, setCourseAdded] = useState(false);
  const [openAddCourse, setOpenAddCourse] = useState(false);

  async function createCourse() {
    try {
      setLoader(true);
      const courseRef = doc(
        db,
        "courses",
        CourseformData?.name?.replace(/ /g, "_")
      );
      await setDoc(courseRef, { ...CourseformData });
      setOpenAddCourse(false);
      setCourseAdded(true);
      setTimeout(() => {
        setCourseAdded(false);
        setCourseFormData({
          name: "",
          description: "",
          prerequisites: "",
          price: 2500,
        });
      }, 3000);
    } catch (error) {
      console.error("error creating course", error);
    } finally {
      setLoader(false);
    }
  }

  const [courseDeleted, setCourseDeleted] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [openDeleteCourse, setopenDeleteCourse] = useState(false);

  async function deleteCourse(name) {
    try {
      setLoader(true);
      const courseRef = doc(db, "courses", name?.replace(/ /g, "_"));
      await deleteDoc(courseRef);
      setCourseDeleted(true);
      setopenDeleteCourse(false);
      setTimeout(() => {
        setCourseDeleted(false);
      }, 3000);
    } catch (error) {
      console.error("error deleting course", error);
    } finally {
      setLoader(false);
    }
  }

  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      async function getAllCourses() {
        try {
          const collectionRef = collection(db, "courses");
          const querySnapshot = await getDocs(collectionRef);

          const allCoursesData = querySnapshot.docs.map((doc) => doc.data());

          setAllCourses(allCoursesData);
        } catch (error) {
          console.error("Error fetching all users", error);
        }
      }

      getAllCourses();
    }
  }, [user, courseDeleted, courseAdded]);

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
        allUsers,
        deleteUserAccount,
        CourseformData,
        handleCourseChange,
        createCourse,
        courseAdded,
        openAddCourse,
        setOpenAddCourse,
        allCourses,
        deleteCourse,
        courseDeleted,
        selectedCourse,
        setSelectedCourse,
        openDeleteCourse,
        setopenDeleteCourse,
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
