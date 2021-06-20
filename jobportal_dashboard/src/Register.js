import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
function Register() {
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("add");
    }
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recruiter, setType] = useState(0);

  const history = useHistory();

  async function signUp() {
    let item = { name, email, password, recruiter };
    let result = await fetch(
      "http://localhost/jobportal/jobportal_backend/public/api/register",
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
    localStorage.setItem("user-info", JSON.stringify(result));
    const user = JSON.parse(localStorage.getItem("user-info"));
    if(user.recruiter)
    history.push("/add");
    else
    history.push("/jobs");
  }

  return (
    <>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <h1>Sign Up</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Full Name"
        />
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Password"
        />
        <br />
        <input onChange={(e) => setType(e.target.checked)} type="checkbox" /><span>Recruiter</span>
        <br/>
        <br/>
        <button onClick={signUp} className="btn btn-secondary">
          Sign Up
        </button>
      </div>
    </>
  );
}

export default Register;
