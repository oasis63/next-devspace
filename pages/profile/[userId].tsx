// pages/profile/[userId].tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserProfile from "@/components/UserProfile/UserProfile";
import { useDatingStore } from "@/store";
import { User } from "@/utils/models";

const UserProfilePage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState<User>();
  const { isLoggedIn, totalUserProfiles } = useDatingStore();

  useEffect(() => {
    // const fetchUserData = async () => {
    //   const response = await fetch(`/api/users/crudUsers?userId=${userId}`);
    //   console.log("response  : ", response);
    //   const data = await response.json();
    //   console.log(data);
    //   setUser(data);
    // };
    // fetchUserData();

    if (userId && isLoggedIn) {
      let userData = totalUserProfiles?.find((user) => user.userId == userId);
      userData && setUser(userData);
    }
  }, [userId]);

  if (!userId || !user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <UserProfile user={user} />
    </>
  );
};

export default UserProfilePage;
