import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Image from "../assets/image.jpeg";
import Logo from "../images/logo.png"
import axios from "axios";
import "./Signup.css";

const UserRegister = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    state: "",
    city: "",
    pincode: "",
    role: "",
    sex: "",
  });

  if (document.URL.indexOf("admin") !== -1) {
    user.role = "Admin";
  } else if (document.URL.indexOf("hotel") !== -1) {
    user.role = "Hotel";
  } else if (document.URL.indexOf("customer") !== -1) {
    user.role = "Customer";
  }

  console.log("ROLE FETCHED : " + user.role);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [genders, setGenders] = useState([]);

  const retrieveAllGenders = async () => {
    const response = await axios.get("http://localhost:8080/api/user/gender");
    return response.data;
  };

  useEffect(() => {
    const getAllGenders = async () => {
      const allGenders = await retrieveAllGenders();
      if (allGenders) {
        setGenders(allGenders.genders);
      }
    };

    getAllGenders();
  }, []);

  const saveUser = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      toast.success("Registered Successfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      result
        .json()
        .then((res) => {
          console.log("response", res);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div className="register-main">
      
      
      <div className="register">
        <div className="register-container">
          
          <div className="register-center">
            <h2>SignUp Here!</h2>
            <p>Please enter your details</p>
            <form onSubmit={saveUser}>
              <div className="register-input-div flex-inputs">
                <div className="column">
                  <input
                    type="text"
                    placeholder="First Name"
                    style={{ width: "100%" }}
                    id="firstName"
                    name="firstName"
                    onChange={handleUserInput}
                    value={user.firstName}
                  />
                </div>
                <div className="column">
                  <input
                    type="text"
                    placeholder="Last Name"
                    style={{ width: "100%" }}
                    id="lastName"
                    name="lastName"
                    onChange={handleUserInput}
                    value={user.lastName}
                  />
                </div>
              </div>


              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={user.password}
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>


              <div className="register-input-div">
                <input
                  type="number"
                  placeholder="Contact Number"
                  id="contact"
                  name="contact"
                  onChange={handleUserInput}
                  value={user.contact}
                />
              </div>
              <div className="register-input-div">
                <input
                  type="email"
                  placeholder="Email"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={user.emailId}
                />
              </div>

              <div className="register-input-div flex-inputs">
                <div className="column">
                  <select
                    style={{ width: "100%" }}
                    onChange={handleUserInput}
                    name="sex"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
              </div>

              <div className="register-input-div">
                <input
                  type="text"
                  placeholder="City"
                  id="city"
                  name="city"
                  onChange={handleUserInput}
                  value={user.city}
                />
              </div>

              <div className="register-input-div">
                <input
                  type="text"
                  placeholder="State"
                  id="state"
                  name="state"
                  onChange={handleUserInput}
                  value={user.state}
                />
              </div>
              
              <div className="register-input-div">
                <input
                  type="number"
                  placeholder="Pincode"
                  id="pincode"
                  name="pincode"
                  onChange={handleUserInput}
                  value={user.pincode}
                />
              </div>
              

              {/* <div className="register-center-options">
                <div className="terms-div">
                  <input type="checkbox" id="terms-checkbox" />
                  <label htmlFor="terms-checkbox">
                    I agree to the terms and conditions
                  </label>
                </div>
              </div> */}
              <div className="register-center-buttons">
                <button type="submit" value="Register User">
                  Sign Up
                </button>
              </div>
              <ToastContainer></ToastContainer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
