import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
function Profile() {
  const [data, setData] = useState([]);
  const [recdata, setRecdata] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("user-info"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
      if(loggedUser){
        let result = await fetch(
            `http://localhost/jobportal/jobportal_backend/public/api/addAppliedjobs/${loggedUser.email}`
          );
          result = await result.json();
          setData(result);
      
          result = await fetch(
            `http://localhost/jobportal/jobportal_backend/public/api/candidates/${loggedUser.email}`
          );
          result = await result.json();
          setRecdata(result);
      }
    
    //console.log(result);
  }, []);

  return (
    <div>
      <Header />
      <div className="col-sm-4 offset-sm-4">
        {loggedUser&&loggedUser.recruiter ? (
          <>
            <h1>Applicants</h1>
            <br />
            {recdata.length ? (
              recdata.map((item) => {
                return (
                  <>
                    <Card>
                      <Card.Header as="h5">{item.company}</Card.Header>
                      <Card.Body>
                        <Card.Title>{item.profile}</Card.Title>
                        <Card.Text>{item.user}</Card.Text>
                        {!item.seen ? (
                          <>
                            <Button
                              onClick={async () => {
                                const cid = item.cid;
                                const status = "Approved";
                                const seen = 1;
                                let temp = { status, seen };
                                let check = await fetch(
                                  `http://localhost/jobportal/jobportal_backend/public/api/updateStatus/${cid}`,
                                  {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                      Accept: "application/json",
                                    },
                                    body: JSON.stringify(temp),
                                  }
                                );
                                window.location.reload(false);
                              }}
                              variant="primary"
                            >
                              Approve
                            </Button>
                            <span> </span>

                            <Button
                              onClick={async () => {
                                const cid = item.cid;
                                const status = "Rejected";
                                const seen = 1;
                                let temp = { status, seen };
                                let check = await fetch(
                                  `http://localhost/jobportal/jobportal_backend/public/api/updateStatus/${cid}`,
                                  {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                      Accept: "application/json",
                                    },
                                    body: JSON.stringify(temp),
                                  }
                                );
                                window.location.reload(false);
                              }}
                              variant="primary"
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <></>
                        )}
                      </Card.Body>
                    </Card>
                    <br />
                  </>
                );
              })
            ) : (
              <>
                <Card>
                  <Card.Body>No one applied yet.</Card.Body>
                </Card>
              </>
            )}
          </>
        ) : (
          <>
            <h1>Jobs Applied</h1>
            <br />
            {data.length ? (
              data.map((item) => {
                return (
                  <>
                    <Card>
                      <Card.Header as="h5">{item.company}</Card.Header>
                      <Card.Body>
                        <Card.Title>{item.profile}</Card.Title>
                        <Card.Text style={{ fontWeight: "bold" }}>
                          Current status: {item.status}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <br />
                  </>
                );
              })
            ) : (
              <>
                <Card>
                  <Card.Body>Nothing to show here.</Card.Body>
                </Card>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
