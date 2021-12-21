import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
      axios.defaults.headers.common["Authorization"] =
        "Token " + token;
    } else {
      setToken("");
      setIsAuthenticated(false);
      axios.defaults.headers.common["Authorization"] = "";
    }
  }, []);

  const setLoading = (status) => {
    setIsLoading(status);
  };

  const setJwt = (jwt) => {
    setToken(jwt);
    setIsAuthenticated(true);
  };

  const removeToken = () => {
    setToken("");
    setIsAuthenticated(false);
  };
  const loginIn = async ({ username, password }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/login", {
        username,
        password,
      });
      const token = response.data.auth_token;
      setJwt(token);
      axios.defaults.headers.common["Authorization"] = "Token " + token;
      localStorage.setItem("token", token);
    } catch (e) {
      console.log(e);
      alert("Don't login");
    }
  };
  const signUp = async ({ username, password }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/", {username,password});
      alert("Account create");
    } catch (e) {
      alert("Don't create ");
    }
  };

  const logOut = async () => {
    try {
      await axios
        .post("http://127.0.0.1:8000/api/token/logout/")
        .then((response) => {
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      removeToken();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isLoading,isAuthenticated, setLoading, setJwt, removeToken, loginIn, signUp,logOut, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw Error("useAuth needs to be used inside AuthContext");
  }

  return auth;
};
