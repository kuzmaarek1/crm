import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [userid, setUserid] = useState(0);
  const [username, setUsername] = useState("");
  const [teamid, setTeamid] = useState(0);
  const [teamname, setTeamname] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
      setUserid(localStorage.getItem("userid"));
      setUsername(localStorage.getItem("username"));
      setTeamid(localStorage.getItem("teamid"));
      setTeamname(localStorage.getItem("teamname"));
      axios.defaults.headers.common["Authorization"] =
        "Token " + token;  
    } else {
      setToken("");
      setIsAuthenticated(false);
      setUserid(localStorage.getItem(0));
      setUsername(localStorage.getItem(""));
      setTeamid(0);
      setTeamname("");
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

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users/me/");
      setUserid(response.data.id);
      setUsername(response.data.username);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userid", response.data.id);
    } catch (e) {
      console.log(e);
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/teams/get_team/");
      setTeamid(response.data.id);
      setTeamname(response.data.name);
      localStorage.setItem("teamname", response.data.name);
      localStorage.setItem("teamid", response.data.id);
    } catch (e) {
      console.log(e);
    }

  };

  const changeTeams=useCallback(async(id)=>{
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/teams/get_team/${id}/`);
      if(response){
      setTeamid(response.data.id);
      setTeamname(response.data.name);
      localStorage.setItem("teamname", response.data.name);
      localStorage.setItem("teamid", response.data.id);
    }
    } catch (e) {
      console.log(e);
    }
  },[]);

  const signUp = async ({ username, password }) => {
    console.log({username, password})
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/", {username,password});
      alert("Account create");
    } catch (e) {
      alert("Don't create ");
    }
  };

  const signUpAndMember= async (request, id) => {
    const {username} = request;
    await signUp(request);
    try{
    const response = await axios.post(`http://127.0.0.1:8000/api/teams/add_member/${id}/`, {username});
   }
   catch (e) {
    alert("Don't add member ");
  }
  }

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
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
      localStorage.removeItem("teamname");
      localStorage.removeItem("teamid");
      setTeamid(0);
      setTeamname('');
      removeToken();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isLoading,isAuthenticated, setLoading, setJwt, removeToken, loginIn, signUp,logOut, token, userid, username, teamid, teamname, changeTeams, signUpAndMember }}
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
