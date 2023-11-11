// pages/profile/[userId].tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header/Header";
import UserProfile from "@/components/UserProfile/UserProfile";
// import Header from "../../components/Header";
// import UserProfile from "../../components/UserProfile";

const UserProfilePage: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState(null);

  // Fetch user data based on userId from your backend API
  // For now, let's mock some data
  const mockUser = {
    userId: String(userId),
    name: "John Doe",
    email: "john.doe@example.com",
    // Add more user properties as needed
  };

  useEffect(() => {
    // Simulate fetching user data from an API
    const fetchUserData = async () => {
      // Replace with an actual API call
      const response = await fetch(`/api/users/crudUsers?userId=${userId}`);
      const data = await response.json();
      setUser(data);
    };

    // if (userId) {
    //   // Simulate delay for API response
    //   const delay = setTimeout(() => {
    //     fetchUserData();
    //   }, 1000);

    //   return () => clearTimeout(delay);
    // }
    // fetchUserData();Marry Jane
  }, [userId]);

  if (!userId || !user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <UserProfile user={mockUser} />
    </div>
  );
};

export default UserProfilePage;
