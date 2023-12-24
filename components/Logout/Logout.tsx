import { useDatingStore } from "@/store";
import { removeUserLocalStorageData } from "@/utils/helpers";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const Logout = () => {
  const router = useRouter();

  const { setLoggedInUser, setIsLoggedIn, setAlertProps } = useDatingStore();

  const handleLogout = async () => {
    removeUserLocalStorageData();
    const response = await fetch("/api/logout");
    if (response?.status == 200) {
      setLoggedInUser(null);
      setIsLoggedIn(false);
      const res = await response.json();

      setAlertProps({
        message: "Logout Successfully!",
        severity: "success",
      });

      window.location.href = "/";
      // window.location.href = "/login";
    }
  };
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
