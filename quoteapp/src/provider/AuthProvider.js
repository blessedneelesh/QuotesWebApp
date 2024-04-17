import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { NavigationBar } from "../pages/UI/Navbar";

const AuthContext = createContext();
//https://quotesbe20240410155641.azurewebsites.net/
//https://localhost:7196/api/
const API_URL = "https://localhost:7196/api/";

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const register = (username, email, password) => {
    console.log(username, email, password);
    return axios
      .post(API_URL + "Account/Register", {
        username,
        email,
        password,
      })
      .catch((error) => {
        if (error.response.status === 500) {
          return { error: error.response.data };
        } else if (error.response.status === 400) {
          // Handle other errors here
          return { error: error.response.data };
        } else {
          return { error: "Some error occured" + error.response.data };
        }
      });
  };

  const login = (username, password) => {
    return axios
      .post(API_URL + "Account/Login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          console.log(JSON.stringify(response.data), response.data);
        }
        setToken(response.data.token);

        return response.data;
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          console.log("Unauthorized. Please log in.");
          return { error: "Unauthorized. Please log in" };
        } else {
          // Handle other errors here
          return { error: "An error occured." + error };
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const getUserProfile = async () => {
    const response = await axios.get(API_URL + "Account/GetProfile");

    return response.data;
  };

  // const getCurrentUser = () => {
  //   return JSON.parse(localStorage.getItem("user"));
  // };

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      register,
      login,
      logout,
      getUserProfile,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <>
      {/* <NavigationBar /> */}
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
