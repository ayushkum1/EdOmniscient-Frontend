import React, { useContext, useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import UserContext from "../../../context/UserContext";
import { useToken } from "../../../services/useToken";
import { fetchMemberById } from "../utils/axios";
import MainProfile from "./mainProfile";

function MainProfileWrapper(props) {
  const routeMatch = useRouteMatch();
  const [user, setUser] = useState(props.user);
  const { token } = useToken();

  const userCtx = useContext(UserContext);

  useEffect(() => {
    if (routeMatch.path !== "/myprofile") {
      const memberId = routeMatch.params.profileId;
      fetchMemberById(token, memberId)
        .then((res) => {
          console.log(res);
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setUser(userCtx.user);
    }
  }, [routeMatch.path, token]);

  return (
    <div>
      {user && routeMatch && <MainProfile user={user} view={routeMatch.path} />}
    </div>
  );
}

export default MainProfileWrapper;
