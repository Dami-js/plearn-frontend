import { getSession, useSession } from "next-auth/client";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

const AuthGuard = (Component) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const accessToken = localStorage.getItem("accessToken");

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        Router.replace("/");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <Component {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default AuthGuard;
