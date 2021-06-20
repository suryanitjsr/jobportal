import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user-info"));
  console.warn(user);
  const history = useHistory();

  function logOut() {
    localStorage.clear();
    history.push("/login");
  }

  function profile(){
    history.push("/profile");
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Job Portal</Navbar.Brand>
        <Nav className="navbar-nav mr-auto nav_bar_wrapper">
          {localStorage.getItem("user-info") ? (
            <>
              {user.recruiter ? (
                <>
                  <Link to="/add">Add Jobs</Link>
                </>
              ) : (
                <>
                  <Link to="/jobs">Jobs List</Link>
                  <Link to="/searchComp">Search by Company</Link>
                  <Link to="/searchJobtype">Search by Exp.</Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/">Login</Link>
              <Link to="register">Register</Link>
            </>
          )}
        </Nav>
        {localStorage.getItem("user-info") ? (
          <Nav className="collapse navbar-collapse justify-content-end mr-auto shift_right">
            <NavDropdown title={user && user.name}>
            <NavDropdown.Item onClick={profile}>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
        ) : null}
      </Navbar>
    </div>
  );
}

export default Header;
