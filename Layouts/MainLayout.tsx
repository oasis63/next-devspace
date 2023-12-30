// components/Layout.tsx
import FooterMui from "@/components/FooterMui/FooterMui";
import ToastMessage from "@/components/Global/ToastMessage/ToastMessage";
import Header from "@/components/Header/Header";
import { useDatingStore } from "@/store";
import { filterProfilesForGivenIds, getGeoCoordinates } from "@/utils/helpers";
import { GeoCoordinates, User } from "@/utils/models";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";

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
  const router = useRouter();
  const pathname = router.pathname;

  const {
    totalUserProfiles,
    alertProps,
    setAlertProps,
    setCities,
    getTotalUserProfiles,
    setLoggedInUser,
    setCurrentUserProfiles,
  } = useDatingStore();

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

  const getUserGeolocation = async () => {
    try {
      const geoCoordinates: GeoCoordinates = await getGeoCoordinates();
      setLoggedInUser({
        ...loggedInUser,
        location: { ...loggedInUser.location, geoCoordinates },
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserGeolocation();
    setCities(citiesData);
    setLoggedInUser(loggedInUser);
  }, []);

  useEffect(() => {
    (async () => {
      await getTotalUserProfiles();
    })();
  }, [getTotalUserProfiles]);

  useEffect(() => {
    // setCurrentUserProfiles([...totalUserProfiles]);
    setCurrentUserProfiles(
      filterProfilesForGivenIds(totalUserProfiles, [
        ...(loggedInUser.dislikedProfiles as string[]),
        ...(loggedInUser.likedProfiles as string[]),
      ])
    );
  }, [totalUserProfiles]);

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

  const alertOnClose = () => {
    setAlertProps(null);
  };

  return (
    <>
      <NextTopLoader color="teal" showSpinner={false} />

      <Header />
      <Container maxWidth="lg">{children}</Container>

      {alertProps && (
        <ToastMessage
          alertOnClose={alertOnClose}
          message={alertProps.message}
          severity={alertProps.severity || "success"}
          timeOut={6000}
        />
      )}

      <FooterMui />
    </>
  );
};

export default MainLayout;
