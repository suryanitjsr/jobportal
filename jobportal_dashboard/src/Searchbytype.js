import Header from "./Header";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
function SearchbyType() {
  const [data, setData] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("user-info"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async (key) => {
    if (localStorage.getItem("user-info")&&loggedUser.recruiter) {
      history.push("/add");
    }
  }, []);

  async function searchJobtype(key){
    let result = await fetch(
        `http://localhost/jobportal/jobportal_backend/public/api/searchbyjobtype/${key}`
      );
      result = await result.json();
      setData(result);
  }

  const history = useHistory();

  //console.warn("data", data);
  return (
    <div>
      <Header />
      <div className="col-sm-8 offset-sm-2">
        <h1>Job Type you want</h1>
        <br/>
        <select onChange = {(e) => searchJobtype(e.target.value)} >
        <option>Select</option>
          <option value="Internship">Internship</option>
          <option value="Entry Level">Entry Level</option>
          <option value="Experienced">Experienced</option>
        </select>
        <br/>
        <br/>
        {data.map((item) => (
          <>
            <Card>
              <Card.Header as="h5">{item.company}</Card.Header>
              <Card.Body>
                <Card.Title>{item.profile}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text style={{ color: "red", fontWeight: "bold" }}>Type: {item.jobtype}</Card.Text>
                <Card.Text style={{ color: "green", fontWeight: "bold" }}>CTC offered: {item.ctc}</Card.Text>
                <Button
                  onClick={async () => {
                    const cid=item.id.toString().concat(loggedUser.email);
                    const jobid = item.id;
                    const status = "In progress";
                    const recruiter = item.user;
                    const profile = item.profile;
                    const company = item.company;
                    const seen = 0;
                    const user = loggedUser.email;
                    let apjob = { cid, jobid, status, recruiter, user, profile, company, seen };
                    let check = await fetch(`http://localhost/jobportal/jobportal_backend/public/api/addAppliedjob/${cid}`);
                    check = await check.json();
                    console.log(check);
                    let result = await fetch(
                      "http://localhost/jobportal/jobportal_backend/public/api/addAppliedjob",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                        },
                        body: JSON.stringify(apjob),
                      }
                    );
                    //console.log(check.length);
                    if(check.length){
                      alert("You have already applied for this job.");

                    }
                    else
                  alert(`Role of ${item.profile} for ${item.company} applied successfully.`);

                  }}
                  variant="primary"
                >
                  Apply
                </Button>
              </Card.Body>
            </Card>
            <br />
          </>
        ))}
      </div>
    </div>
  );
}

export default SearchbyType;
