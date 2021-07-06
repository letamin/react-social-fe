import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

import "./login.css";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">Social</h3>
          <span className="login-desc">
            Connect with friends and other around you
          </span>
        </div>
        <div className="login-right">
          <form className="login-box" onSubmit={handleLogin}>
            <input
              type="email"
              className="login-input"
              required
              placeholder="Email"
              ref={email}
            />
            <input
              type="password"
              className="login-input"
              required
              placeholder="Password"
              minLength="6"
              ref={password}
            />
            <button className="login-button" disabled={isFetching}>
              {isFetching ? <CircularProgress color="white" /> : "Log In"}
            </button>
            <span className="login-forgot">Forgot your password?</span>
            <button className="login-register">
              {isFetching ? <CircularProgress color="white" /> : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
