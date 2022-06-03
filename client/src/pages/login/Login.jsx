import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);      //USEContext to call my context

  const handleSubmit = async (e) => {                            //ASYNC FUNCTION BECAUSE WE WILL MAKE REQUEST TO OUR API
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {                                                  //MY API CALL
      const res = await axios.post("/auth/login", {          //WE CALL OUR AXIOS
        username: userRef.current.value,                      //WE PASS OUR DATA (PASSWORD AND USERNAME)
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });       //LOGIN SUCCESS BECAUSE WE HAVE RESPONCE AND DATA
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..!"
          ref={userRef}                  //INDICATE MY REFERENCE
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>     
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
