import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { auth } from "../../firebase";
import "./Login.css";

function Login() {
  const History = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          History.push("/"); // If all thing is perfect then redriect to home page.
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const register = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          History.push("/"); // If all thing is perfect then redriect to home page.
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="Login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/800px-Amazon_logo.svg.png"
          alt="amazon_logo"
        ></img>
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign in
          </button>
        </form>
        <div className="small__info">
          <input type="checkBox" checked />
          <p>By signing-in you agree to Amazon's Conditions of Use & Sale.</p>
        </div>
        <button
          type="submit"
          onClick={register}
          className="login__registerButton"
        >
          Create an Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
