import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import "./register.css";

export default function Register() {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Passwords do not match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
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
          <form className="register-box" onSubmit={handleRegister}>
            <input
              type="username"
              className="login-input"
              placeholder="User name"
              ref={username}
              required
            />
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              ref={email}
              required
            />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              ref={password}
              required
              minLength="6"
            />
            <input
              type="password"
              className="login-input"
              placeholder="Repeat Password again"
              ref={passwordAgain}
              minLength="6"
            />
            <button className="login-button">Sign up</button>
            <button className="login-register">Login to your account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
