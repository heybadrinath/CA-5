import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Registration() {
  // State for form input data
  let [inputData, changeInputData] = useState({
    firstName: "",
    email: "",
    password: "",
    passwordRe: "",
  });

  // State for form validation errors
  let [formError, setError] = useState({});
  // State to track form submission
  let [formSubmit, setSubmit] = useState(false);
  // State to control showing the toast
  let [showToast, setShowToast] = useState(false);

  // useEffect to handle navigation after toast is gone
  useEffect(() => {
    if (showToast) {
      // Set timeout to navigate after the toast is gone
      const timeoutId = setTimeout(() => {
        setSubmit(false); // Reset submit state
        setShowToast(false); // Reset showToast state
        window.location.href = "/";
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [showToast]);

  // Handle form input changes
  const handleInput = (e) => {
    let { name, value } = e.target;
    changeInputData({
      ...inputData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let error = validate(inputData);
    setError(error);

    let errorKeys = Object.keys(error);

    if (errorKeys.length === 0) {
      setSubmit(true);
      setShowToast(true); // Trigger the toast
      notify();
    } else {
      setSubmit(false);
    }
  };

  // Toast notification for success
  const notify = () => {
    toast.success("Registration Successful !");
  };

  // logic for form data checking
  const validate = (data) => {
    let error = {};

    if (data.firstName.trim() === "") {
      error.firstName = "Please enter the first name";
    }

    if (data.email.trim() === "") {
      error.email = "Please enter the email";
    }

    const pattern =
      /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{10,}$/;
    if (!pattern.test(data.password)) {
      error.password =
        "Password should contain at least one special character and be a minimum of 10 characters long.";
    }

    if (data.passwordRe.trim() !== data.password.trim() || !data.passwordRe) {
      error.passwordRe =
        "Re-Entered Password Does Not Match The First Password";
    }

    return error;
  };

  return (
    <div className="parent">
      {/* Registration form */}
      <form onSubmit={handleSubmit}>
        {/* Input fields for the form */}
        <label htmlFor="firstName">Enter Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="Name Here"
          onChange={handleInput}
        />
        {formError.firstName && <p>{formError.firstName}</p>}

        <label htmlFor="email">Enter Email</label>
        <input
          type="email"
          name="email"
          placeholder=" Email here"
          onChange={handleInput}
        />
        {formError.email && <p>{formError.email}</p>}

        <label htmlFor="password">Enter Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password Here"
          onChange={handleInput}
        />
        {formError.password && <p>{formError.password}</p>}

        <label htmlFor="passwordRe">Re-Enter Password</label>
        <input
          type="password"
          name="passwordRe"
          placeholder="Re-Enter Password Here"
          onChange={handleInput}
        />
        {formError.passwordRe && <p>{formError.passwordRe}</p>}

        {/* Submit button for the form */}
        <input type="submit" value={"Register"} className="btn" />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
      </form>
    </div>
  );
}

export default Registration;
