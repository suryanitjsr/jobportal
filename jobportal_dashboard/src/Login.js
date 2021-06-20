import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/add");
    }
  });

  async function logging() {
    let item = { email, password };
    let result = await fetch(
      "http://localhost/jobportal/jobportal_backend/public/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    result = await result.json();
    //console.log(result);
    if (result.hasOwnProperty('error'))
      alert("Email or Password is incorrect");
    else {
      localStorage.setItem("user-info", JSON.stringify(result));
      const user = JSON.parse(localStorage.getItem("user-info"));
      if (user.recruiter) history.push("/add");
      else history.push("/jobs");
    }
  }

  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <h1>Login Page</h1>
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={logging} className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
