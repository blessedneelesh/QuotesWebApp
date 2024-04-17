import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../../provider/AuthProvider";
import search from "../../../searchIcon.png";
import InputGroup from "react-bootstrap/InputGroup";

const NavigationBar = ({ searchTerm, stateChanger }) => {
  const [sTerm, setSTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  var { token, logout, getUserProfile } = useAuth();
  const [userProfile, setUserProfile] = useState("");

  const location = useLocation();

  const getCurrentUser = async () => {
    setIsLoading(true);
    var data = await getUserProfile();
    setUserProfile(data);
    console.log(data, "currentUser");
    setIsLoading(false);
  };

  const Logout = () => {
    logout();
    navigate("/home");
    window.location.reload();
  };

  const handleChange = (e) => {
    console.log(e.target.value, "ENTERED");
    setSTerm(e.target.value);
  };

  const handleClick = () => {
    navigate("/searchResult", { state: sTerm });
    //stateChanger(sTerm);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bg-light " fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/home">
            Amazing Quotes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="shadow-none" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/profile" state={{ id: 0 }}>
                Favourite
              </Nav.Link>
            </Nav>

            <Form className="d-flex mt-1">
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  size="sm"
                  className=" shadow-none "
                  value={sTerm}
                  onChange={(e) => handleChange(e)}
                />
                <InputGroup.Text size="sm" id="basic-addon2">
                  <img
                    src={search}
                    alt="searchIcon"
                    id="search"
                    onClick={() => handleClick()}
                  />
                </InputGroup.Text>
              </InputGroup>
            </Form>

            <div className="mt-1">
              {token && !isLoading ? (
                <div className="logout">
                  <div className="logoutBtn">
                    <Button size="sm" onClick={() => Logout()}>
                      Logout
                    </Button>
                  </div>

                  <div className="logoutName">
                    <span>
                      {userProfile.userName &&
                        `Hi,${" "}` +
                          userProfile.userName.charAt(0).toUpperCase() +
                          userProfile.userName.slice(1)}
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{ marginLeft: "8px" }}>
                  {"  "}
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-primary"
                    className="btn-sm me-2"
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    variant="outline-primary"
                    className="btn-sm me-2"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
