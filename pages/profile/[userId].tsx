// pages/profile/[userId].tsx

import React from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header/Header";
import UserProfile from "@/components/UserProfile/UserProfile";
// import Header from "../../components/Header";
// import UserProfile from "../../components/UserProfile";

const UserProfilePage: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query;

  // Fetch user data based on userId from your backend API
  // For now, let's mock some data
  const mockUser = {
    userId: String(userId),
    name: "John Doe",
    email: "john.doe@example.com",
    // Add more user properties as needed
  };

  if (!userId) {
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
