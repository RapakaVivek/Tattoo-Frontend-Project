import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setuser } from "../CartComp";

function Login() {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  const initialState =localStorage.getItem("authToken") || [];

  useEffect(()=>{
    if(initialState){
      console.log("login page",initialState)
    }
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
     
      const response = await axios.post("http://localhost:5000/Login/login", {
        email,
        password,
        
      });
      
      console.log(response.data.user)
      
      if (response.data.token) {
     
        let _id=response?.data?.user?._id;
        let name = response?.data?.user?.username;
        let email = response?.data?.user?.email;
        let phonenumber = response?.data?.user?.phonenumber;
        console.log(_id,name,email,phonenumber)
         dispatch(setuser({_id,name,email,phonenumber}))
        localStorage.setItem("authToken", response.data.token);
        navigate("/Home");

      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (error) {
      
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };
  return (
    <div className="login">
      <h1 className="logi">Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <div>
        <Link to="/forgetpassword">Forgot Password?</Link>
      </div>
      <div>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;