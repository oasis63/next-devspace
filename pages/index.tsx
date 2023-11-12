// pages/index.tsx

import FeaturedUser from "@/components/FeaturedUser/FeaturedUser";
import FooterMui from "@/components/FooterMui/FooterMui";
import Header from "@/components/Header/Header";
import UserList from "@/components/UserList/UserList";
import { mockUsers } from "@/testDatas/mockUsers";
import { User } from "@/utils/models";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  // const [users, setUsers] = useState([]);

  const featuredUser = mockUsers[0];

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users/crudUsers");
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // Fetch users from your API
    // fetchUsers();
    // For now, let's mock some data
    const mockUsers = [
      { userId: "111", name: "John Doe" },
      { userId: "222", name: "Marry Jane" },
      // Add more users as needed
    ];
    setUsers(mockUsers);
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* <FeaturedUser user={featuredUser} /> */}
        <UserList users={mockUsers} />
      </main>
      <FooterMui />
    </>
  );
};

export default Home;
