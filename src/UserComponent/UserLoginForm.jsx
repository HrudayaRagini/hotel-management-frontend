import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import Logo from "../images/logo.png"
import Image from "../assets/image.jpeg"
import "./Login.css";



const UserLoginForm = () => {
  const [ showPassword, setShowPassword ] = useState(false);
  
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        if (res.role === "Admin") {
          sessionStorage.setItem("active-admin", JSON.stringify(res));
        } else if (res.role === "Customer") {
          sessionStorage.setItem("active-customer", JSON.stringify(res));
        } else if (res.role === "Hotel") {
          sessionStorage.setItem("active-hotel", JSON.stringify(res));
        }

        toast.success("logged in successfully!!!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navigate("/home");
        window.location.reload(true);
      });
    });
    e.preventDefault();
  };

  return (
    <div className="login-main">
      <div className="login-container w-50">
       
        <div className="login-center">
          <h2>Login Here!</h2>
          <p>Please enter your credentials</p>
          <form>
            <input type="email" placeholder="Email" id="emailId" name="emailId" onChange={handleUserInput} value={loginRequest.emailId} />
            <div className="pass-input-div">
              <input type={showPassword ? "text" : "password"} placeholder="Password" id="password" name="password" onChange={handleUserInput} value={loginRequest.password} autoComplete="on" />
              {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
            </div>
              
             
            <div className="gender-div">
              {/* <label htmlFor="role">User Role</label> */}
              <select onChange={handleUserInput} name="role">
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Customer">Customer</option>
                <option value="Hotel">Manager</option>
              </select>
            </div> 



            
            <div className="login-center-buttons button-31">
              <button type="submit" onClick={loginAction}>Log In</button>
            </div>
            <ToastContainer></ToastContainer>
          </form>
        </div>

        <p className="login-bottom-p ">
          Don't have an account? <Link to={"/user/customer/register"}>Sign Up</Link>
        </p>
      </div>
  </div>
  );
};

export default UserLoginForm;
