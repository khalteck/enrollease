import { useEffect } from "react";
import Header from "../components/Header";
import Toast from "../components/Toast";
import { useAppContext } from "../contexts/AppContext";
import { auth } from "../firebase/firebase-config";

const Dashboard = () => {
  const { loginSuccess } = useAppContext();

  useEffect(() => {
    // Add an event listener to the Firebase auth state change
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Current User:", user);
      } else {
        console.log("No user signed in");
      }
    });

    // Clean up the event listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  // console.log("userData", userData);

  return (
    <>
      <Header />
      {loginSuccess && (
        <div className="w-[300px]">
          <Toast message="Login success" />
        </div>
      )}
      <main className="pt-[80px]">
        <h1 className="font-bold text-[1.75rem] text-center mt-8">
          The dashboard
        </h1>
      </main>
    </>
  );
};

export default Dashboard;
