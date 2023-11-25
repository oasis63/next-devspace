// components/Layout.tsx
import FooterMui from "@/components/FooterMui/FooterMui";
import Header from "@/components/Header/Header";
import { useDatingStore, useHeaderStore } from "@/store";
// import { useHeaderStore } from "@/store/headerStore";
// import useLayoutEvents from "@/hooks/useLayoutEvents";
import { mockUsers } from "@/testDatas/mockUsers";
import { filterUserProfiles } from "@/utils/helpers";
import { User } from "@/utils/models";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}
const citiesData = [
  "New York",
  "Los Angeles",
  "San Francisco",
  "Paris",
  "Denver",
];

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  // const { layoutEvent, handleLayoutEvent } = useLayoutEvents();

  const router = useRouter();
  const pathname = router.pathname;

  //console.log("router : ", router);
  //console.log("pathname : ", pathname);

  // const { setCities } = useHeaderStore();

  const {
    totalUserProfiles,
    currentUserProfiles,
    currentCity,
    setCities,
    getTotalUserProfiles,
    setLoggedInUser,
    setCurrentUserProfiles,
  } = useDatingStore();

  useEffect(() => {
    (async () => {
      await getTotalUserProfiles();
    })();
  }, [getTotalUserProfiles]);

  const loggedInUser: User = {
    userId: "1",
    username: "john_doe",
    name: "John Doe",
    age: 28,
    email: "john.doe@example.com",
    phone: "123-456-7890",
    location: {
      city: "New York",
      state: "NY",
      country: "USA",
    },
    interests: ["Reading", "Hiking", "Photography"],
    matchingPreference: {
      age: {
        min: 25,
        max: 35,
      },
      gender: "Female",
      distance: 50,
    },
    photos: ["https://reqres.in/img/faces/1-image.jpg"],
    profilePhotoUrl: "https://reqres.in/img/faces/1-image.jpg",
    likedProfiles: ["2", "4", "1"],
    dislikedProfiles: ["3"],
  };

  // ikedProfilesCount={loggedInUser.likedProfiles?.length || 0}
  // dislikedProfilesCount={loggedInUser.dislikedProfiles?.length || 0}

  useEffect(() => {
    setCities(citiesData);
    setLoggedInUser(loggedInUser);
  }, []);

  useEffect(() => {
    //console.log("router changed ");
    //console.log("router : ", router);
    if (router && router.pathname == "/") {
      const queryRef = router?.query;
      const profileVal = queryRef?.profiles;
      if (queryRef && profileVal) {
        if (profileVal == "liked") {
          //console.log("render liked profiles");
        } else if (profileVal == "disliked") {
          //console.log("render disliked profiles");
        }
      } else {
        //console.log("render all the profiles");
        // setCities(cities);
      }
    }
  }, [router]);

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
    const users = mockUsers.filter((user) =>
      loggedInUser.likedProfiles?.includes(user.userId)
    );
    setUsers(users);
    // handleLayoutEvent(users);
  };

  const handleDislikedProfilesClick = (event: any) => {
    console.log("handleDislikedProfilesClick event : ", event);

    const users = mockUsers.filter((user) =>
      loggedInUser.dislikedProfiles?.includes(user.userId)
    );
    setUsers(users);

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
  //   console.log("currentCity : changed : ", currentCity);
  //   setCurrentUserProfiles(
  //     filterUserProfiles(
  //       totalUserProfiles,
  //       loggedInUser,
  //       "filterByCity",
  //       currentCity
  //     )
  //   );
  // }, [currentCity]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">{children}</Container>
      <FooterMui />
    </>
  );
};

export default MainLayout;
