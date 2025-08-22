import { createContext, useEffect, useState } from "react";
import { GetLoggedUser } from "../services/StreamService";

export const UserContext = createContext(null);

export const UserDetailProvider = (props) => {
  const [token, setToken] = useState("");
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    async function loadUserDetail() {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        const detail = await GetLoggedUser();
        setUserDetail(detail);
      }
    }
    loadUserDetail();
  }, []);

  const contextValue = {
    token,
    userDetail,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
