import { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom"; 
import axios from "axios";
import "./login.css";

function RegisteredLogin() {
  const navigateTo = useNavigate(); 

  const initialValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    try{
      const response = await axios.post("http://localhost:3000/authenticateUser", {
        email: formValues.email,
        password: formValues.password,
      })

      if(response.data){
        console.log("Login successfull");
        navigateTo("/home");
      }
      else {
        console.error('Login failed: Invalid credentials');
      }
    }
    catch(error){
      console.log("Login error", error);
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
    return errors;
  };

  return (
    <>
      <div className="bgImg"></div>
      <div className="loginContainer">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          console.log("Signed in")
        ) : (
          console.log("error signing in")
        )}

        <form className="loginForm" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="ui divider"></div>
          <div className="ui form">
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
            <button className="fluid ui button blue">Submit</button>
          </div>
        </form>
        <div className="text">
          Don't have an account? <span onClick={() => navigateTo("/")}>Sign up</span>
        </div>
      </div>
    </>
  );
}

export default RegisteredLogin;
