import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { loggedUser } from "../api/auth.api";

export const UserContext = createContext(null);

export const UserDetailProvider = (props) => {
  const [token, setToken] = useState("");
  const [userDetail, setUserDetail] = useState();
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [channelType, setChannelType] = useState("text");
  const [showCreateServerModal, setShowCreateServerModal] = useState(false);
  const [invite, setInvite] = useState(false);

  // const {
  //   data: userDetail,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["logged-user-details"],
  //   queryFn: () => loggedUser().then((res) => res.data),
  //   enabled: !!localStorage.getItem("token"),
  // });

  useEffect(() => {
    async function loadUserDetail() {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        const detail = await loggedUser();
        setUserDetail(detail.data);
      }
    }
    loadUserDetail();
  }, []);

  const contextValue = {
    token,
    userDetail,
    setShowCreateChannelModal,
    setChannelType,
    showCreateChannelModal,
    channelType,
    showCreateServerModal,
    setShowCreateServerModal,
    invite,
    setInvite,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
