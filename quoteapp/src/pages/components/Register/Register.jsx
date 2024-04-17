import { Footer, NavigationBar } from "../../UI";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Register.css";
import { useState } from "react";
import { useAuth } from "../../../provider/AuthProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const { register, token } = useAuth();

  var navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    console.log(isValidEmail, "isValidEmail");
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
      setErrors(newErrors);
      isValid = false;
    }
    if (email && !isValidEmail) {
      newErrors.email = "Email should follow 'example@gmail.com' pattern";
      setErrors(newErrors);
      isValid = false;
    }
    if (!username) {
      newErrors.username = "Username is required";
      setErrors(newErrors);
      isValid = false;
    }
    if (username && username.length < 3) {
      newErrors.username = "Username should be atleast 3 character long.";
      setErrors(newErrors);
      isValid = false;
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
    const isValidPassword = passwordRegex.test(password);
    console.log(isValidPassword, "isValidPassowr");
    if (!password) {
      newErrors.password = "Password is required";
      setErrors(newErrors);
      isValid = false;
    }
    if (password && !isValidPassword) {
      newErrors.password =
        "Password should be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one alphanumeric character";
      setErrors(newErrors);
      isValid = false;
    }

    return isValid;
  };

  const Register = async (e) => {
    e.preventDefault();
    var newErrors = {};
    if (validateForm()) {
      const response = await register(username, email, password);
      console.log(response, "WHEN SUCCESS");
      if (response.status == 200) {
        newErrors.registeredMsg = response.data.message;
        setErrors(newErrors);
      } else if (response.error.status === "Error") {
        //500 internal error
        console.log(response.error.status, "HAHAHA");
        newErrors.badRequest = response.error.message;
        setErrors(newErrors);
        console.log(response.error);
      } else {
        //400 bad request
        newErrors.badRequest = `${response.error.title}  
          Username should be atleast 3 character long.`;
        setErrors(newErrors);
      }
    }
    // const res = await register(username, email, password);

    // e.target.reset();
  };

  console.log(email, username, password, "ad");
  return (
    <>
      <NavigationBar />
      <div className="register">
        <div className="row">
          <div className="col-lg-3 col-md-2 col-sm-2 col-xs-1"></div>
          <div className="col-lg-4 col-md-8 col-sm-8 col-xs-10">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="shadow-none"
                  value={email}
                  size="sm"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "90%" }}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUsername">
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
                  placeholder="Enter password"
                  className="shadow-none"
                  value={password}
                  size="sm"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "90%" }}
                />
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
                {errors.badRequest && (
                  <div className="error">{errors.badRequest}</div>
                )}
                {errors.registeredMsg && (
                  <div className="success">{errors.registeredMsg}</div>
                )}
              </Form.Group>
              <div className="row">
                <div className="col-4">
                  <Button
                    size="sm"
                    variant="primary"
                    type="button"
                    onClick={(e) => Register(e)}
                  >
                    Submit
                  </Button>
                </div>
                <div className="col-8">
                  {" "}
                  <Link to="/login">
                    <span style={{ fontSize: "0.9rem" }}>
                      Already have an Account? Login
                    </span>
                  </Link>{" "}
                </div>
              </div>
            </Form>
          </div>
          <div className="col-lg-3 col-md-2 col-sm-2 col-xs-1"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
