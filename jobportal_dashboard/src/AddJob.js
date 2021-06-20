import Header from "./Header";
import { useState, useEffect } from "react";
import React, { useHistory } from "react-router-dom";
function AddJob() {
  const [profile, setProfile] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [ctc, setCTC] = useState("");
  const [jobtype,setJobtype] = useState("Internship");
  const new_item = JSON.parse(localStorage.getItem("user-info"));

  var user = "";
  if (new_item) user = new_item.email;

  async function newjob() {
    let item = { profile, company, description, ctc, user, jobtype };

    let result = await fetch(
      "http://localhost/jobportal/jobportal_backend/public/api/addJob",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    alert("Job added successfully");
  }
  const loggedUser = JSON.parse(localStorage.getItem("user-info"));

  useEffect(() => {
    if (localStorage.getItem("user-info") && !loggedUser.recruiter) {
      history.push("/jobs");
    }
  }, []);

  const history = useHistory();

  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <br />
        <input
          onChange={(e) => setProfile(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Profile"
          required
        />
        <br />
        <input
          onChange={(e) => setCompany(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Company"
          required
        />
        <br />
        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Description"
          required
        />
        <br />
        <input
          onChange={(e) => setCTC(e.target.value)}
          type="text"
          className="form-control"
          placeholder="CTC"
          required
        />
        <br />
        <select onChange = {(e) => setJobtype(e.target.value)} >
          <option value="Internship">Internship</option>
          <option value="Entry Level">Entry Level</option>
          <option value="Experienced">Experienced</option>
        </select>
        <br/>
        <br/>
        <br/>
        <br/>
        <button onClick={newjob} className="btn btn-primary">
          Add Job
        </button>
      </div>
    </div>
  );
}

export default AddJob;
