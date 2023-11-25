// pages/index.tsx

import FeaturedUser from "@/components/FeaturedUser/FeaturedUser";
import FooterMui from "@/components/FooterMui/FooterMui";
import Header from "@/components/Header/Header";
import UserList from "@/components/UserList/UserList";
import { useDatingStore } from "@/store";
import { mockUsers } from "@/testDatas/mockUsers";
import { User } from "@/utils/models";
import Link from "next/link";
import { useEffect, useState } from "react";

const cities = ["New York", "Los Angeles", "London", "Paris", "Tokyo"];

const Home = () => {
  // const { layoutEvent } = useLayoutEvents();

  // const loggedInUser: User = {
  //   userId: "1",
  //   username: "john_doe",
  //   name: "John Doe",
  //   age: 28,
  //   email: "john.doe@example.com",
  //   phone: "123-456-7890",
  //   location: {
  //     city: "New York",
  //     state: "NY",
  //     country: "USA",
  //   },
  //   interests: ["Reading", "Hiking", "Photography"],
  //   matchingPreference: {
  //     age: {
  //       min: 25,
  //       max: 35,
  //     },
  //     gender: "Female",
  //     distance: 50,
  //   },
  //   photos: ["https://reqres.in/img/faces/1-image.jpg"],
  //   profilePhotoUrl: "https://reqres.in/img/faces/1-image.jpg",
  //   likedProfiles: ["2", "4", "1"],
  //   dislikedProfiles: ["3"],
  // };

  const [users, setUsers] = useState<User[]>([]);

  const [cityUsers, setCityUsers] = useState<User[]>([]);

  const [selectedCity, setSelectedCity] = useState<string>("");

  const getUsersBasedOnCity = (city: string) => {
    if (city == "" || city == "All") return mockUsers;
    return mockUsers.filter((user) => user?.location?.city == city);
  };

  // const getUsersBasedOnCity = (city: string) => {
  //   if (city == "" || city == "All") return mockUsers;
  //   return mockUsers.filter((user) => user?.location?.city == city);
  // };

  const handleCityFilterChange = (city: string) => {
    setSelectedCity(city);
    // Implement your logic to filter users by city
    console.log(`Filtering by city: ${city}`);
    const cityUsers = getUsersBasedOnCity(city);
    setCityUsers(cityUsers);
    setUsers(cityUsers);
  };

  const handleLikedProfilesClick = (event: any) => {
    console.log("handleLikedProfilesClick event : ", event);
    // navigate to liked profiles page
    // or rendered the liked profiles on the home page
    // give option to X ..or message the liked profiles
    // const users = mockUsers.filter((user) =>
    //   loggedInUser.likedProfiles?.includes(user.userId)
    // );
    setUsers(cityUsers);
  };

  const handleDislikedProfilesClick = (event: any) => {
    console.log("handleDislikedProfilesClick event : ", event);

    // navigate to disliked profiles page
    // or rendered the disliked profiles on the home page
    // give option to like again ..
  };

  const handleHomeClick = (event: any) => {
    console.log("handleHomeClick event : ", event);

    // navigate to disliked profiles page
    // or rendered the disliked profiles on the home page
    // give option to like again ..
  };

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
    setUsers(mockUsers);
  }, []);

  // useEffect(() => {
  //   if (layoutEvent) {
  //     // Handle the event in index.tsx
  //     console.log("Event from MainLayout:", layoutEvent);
  //     // Add your logic here
  //   }
  // }, [layoutEvent]);

  const totalUserProfiles = useDatingStore((store) => store.totalUserProfiles);
  const currentUserProfiles = useDatingStore(
    (store) => store.currentUserProfiles
  );

  return (
    <>
      <UserList users={currentUserProfiles} />
    </>
  );
};

export default Home;

// this is the center part of the index.tsx or home page ..
