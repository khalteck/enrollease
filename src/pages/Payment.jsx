import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
// import Toast from "../components/Toast";
import { useAppContext } from "../contexts/AppContext";
import ScrollToTop from "../ScrollToTop";
import { usePaystackPayment } from "react-paystack";
import { useState } from "react";

const Payment = () => {
  const { selectedCourses, userData, setPaid } = useAppContext();

  const navigate = useNavigate();

  console.log("userData", userData);

  const totalPrice = selectedCourses?.reduce((sum, item) => {
    if (item.price) {
      return sum + item.price;
    }
    return sum;
  }, 0);

  //==================================== to handle payment
  // paystack integration
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: `${userData?.email}`, //user email
    amount: `${totalPrice}00`, //amount is in Kobo
    publicKey: "pk_test_c9e136db34c0d202081e2efdcb7d5c4d991d3bd6",
  };

  //to init paystack
  const initializePayment = usePaystackPayment(paystackConfig);

  const [paymenSuccess, setPaymentSuccess] = useState(false);
  //paystack functions
  const onSuccess = (transaction) => {
    console.log("payment success", transaction);
    // setPaid(true);
    if (transaction) {
      setPaid(transaction, totalPrice);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        navigate("/dashboard");
      }, 3000);
    }
  };
  const onClose = () => {
    alert("Transaction was not completed, window closed.");
  };

  return (
    <>
      <Header />

      <main className="pt-[60px] pb-[100px] md:pt-[80px] bg-[#ecfdf5]/20">
        <section className="px-3 md:px-[200px] ">
          <h1 className="font-medium text-[1.25rem] md:text-[1.75rem] text-center mt-8 uppercase">
            Course Registration
          </h1>
          <p className="mt-7 tracking-wider text-black/80 text-[1.1rem]">
            NOTE: Do not refresh this page!
          </p>

          {selectedCourses?.length > 0 && (
            <div className="w-full mt-7 border border-[#10b981]/30 rounded-lg flex flex-col gap-3 p-3">
              <h2 className="text-[1.2rem] font-medium text-center">
                Selected Courses
              </h2>
              {selectedCourses?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full p-2 border-b border-[#10b981]/30 font-normal"
                  >
                    {item?.name}
                  </div>
                );
              })}

              <p>
                Total Cost:{" "}
                <span className="text-[1.75rem] font-bold">
                  {totalPrice} Naira
                </span>
              </p>

              <p className="my-2 text-black/50 text-[.85rem]">
                To complete your enrollment process you are to pay a sum of{" "}
                {totalPrice} Naira
              </p>

              <button
                onClick={() => {
                  initializePayment(onSuccess, onClose);
                }}
                className="w-fit px-8 py-2 bg-[#10b981] uppercase text-[.85rem] text-white font-medium hover:bg-[#10b981]/70 rounded-md"
              >
                Pay now
              </button>
            </div>
          )}

          {selectedCourses?.length === 0 && (
            <div className="w-full h-[200px] mt-7 border border-[#10b981]/30 rounded-lg flex justify-center items-center text-black/60">
              No selected courses,{" "}
              <Link to="/dashboard" className="text-[#10b981] hover:underline">
                {" "}
                back to dashboard?
              </Link>
            </div>
          )}
        </section>
      </main>

      {paymenSuccess && (
        <div className="w-full h-screen fixed top-0 left-0 bg-[#10b981]/80 flex justify-center items-center z-10 p-3">
          <div className="w-[500px] min-h-[200px] bg-white rounded-lg p-4 relative scale text-center">
            <p className="mt-7 tracking-wider text-black/80 text-[1.1rem] text-center">
              Payment successful!
            </p>

            <p className="w-fit text-black/60 text-[.75rem] mt-8 p-3 border-2 border-[#10b981]/80 rounded-md mx-auto">
              Redirecting...
            </p>
          </div>
        </div>
      )}

      <ScrollToTop />
    </>
  );
};

export default Payment;
