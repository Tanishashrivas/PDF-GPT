import { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom"; 
import "./login.css";
import Home from "../Home";
import axios from "axios";
import { signInWithGooglePopup } from "../firebase";

function Login() {
  const navigateTo = useNavigate(); 

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    // Backend data sending...
    try {
      const response = await axios.post("http://localhost:3000/login", { formValues });
      console.log(response.data);

      if (Object.keys(formErrors).length === 0) {
        navigateTo('/home'); // Redirect to the home route
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Those passwords didn’t match. Try again.";
    }
    return errors;
  };

  const handleSignIn = async () => {
    try {
      await signInWithGooglePopup();
      console.log('User signed in with Google successfully!');
      navigateTo("/home"); // Redirect to Home after successful Google sign-in
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <>
      <div className="bgImg"></div>
      <div className="loginContainer">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <p>Successfull login, redirecting...</p>
        ) : (
          console.log("error signing in")
        )}

        <form className="loginForm" onSubmit={handleSubmit} method="POST" action="/login">
          <h1>Sign Up</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label className="labelClass">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.username}</p>
            <div className="field">
              <label className="labelClass">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="field">
              <label className="labelClass">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>
            <div className="field">
              <label className="labelClass">Confirm Password</label>
              <input
                className="inputFieldLogin"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.confirmPassword}</p>
            <button className="fluid ui button blue">Submit</button>
          </div>
        </form>
        <div className="text">
          Already have an account? <span onClick={() => navigateTo("/login")}>Login</span>
        </div>

        <div>
          <a className="googleText" href="#" onClick={handleSignIn}>
            Login with Google
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
