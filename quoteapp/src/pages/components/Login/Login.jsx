import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Footer, NavigationBar } from "../../UI";
import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!username) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const Login = async (e) => {
    e.preventDefault();
    var newErrors = {};
    if (validateForm()) {
      e.preventDefault();

      var response = await login(username, password);
      if (response.error) {
        console.log(response.error, "HAHAHA");
        newErrors.unauthorized =
          "Unauthorized. Username and password do not match.";
        setErrors(newErrors);
        console.log(response.error);
      } else {
        navigate("/home");
      }
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="login">
        <div className="row">
          <div className="col-lg-3 col-md-2 col-sm-2 col-xs-1"></div>
          <div className="col-lg-4 col-md-8 col-sm-8 col-xs-10">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  className="shadow-none"
                  value={username}
                  size="sm"
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: "90%" }}
                />
                {errors.username && (
                  <div className="error">{errors.username}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  className="shadow-none"
                  size="sm"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "90%" }}
                />
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
                {errors.unauthorized && (
                  <div className="error">{errors.unauthorized}</div>
                )}
              </Form.Group>
            </Form>
            <div className="row">
              <div className="col-4">
                <Button
                  size="sm"
                  variant="primary"
                  type="button"
                  onClick={(e) => Login(e)}
                >
                  Submit
                </Button>
              </div>
              <div className="col-8">
                {" "}
                <Link to="/register">
                  <span style={{ fontSize: "0.9rem" }}>
                    Don't have an Account? Register
                  </span>
                </Link>{" "}
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-2 col-sm-2 col-xs-1"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
