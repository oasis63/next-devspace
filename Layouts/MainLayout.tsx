// components/Layout.tsx
import FooterMui from "@/components/FooterMui/FooterMui";
import ToastMessage from "@/components/Global/ToastMessage/ToastMessage";
import Header from "@/components/Header/Header";
import { useDatingStore } from "@/store";
import {
  filterProfilesForGivenIds,
  getGeoCoordinates,
  getLocationAddressDetails,
} from "@/utils/helpers";
import { GeoCoordinates, Location, User } from "@/utils/models";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";
import {
  decryptData,
  getLocalStorageKeyData,
  highDecryptData,
  isUserLoggedIn,
} from "@/utils/authUtils";
import { ENC_USER_DATA_KEY, USER_DATA_KEY } from "@/utils/constants";

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

const MainLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const pathname = router.pathname;

  const {
    isLoggedIn,
    loggedInUser,
    totalUserProfiles,
    alertProps,
    setAlertProps,
    setCities,
    getTotalUserProfiles,
    setLoggedInUser,
    setCurrentUserProfiles,
    setUserGeoCoordinates,
  } = useDatingStore();

  const loggedInUser1: User = {
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
      setUserGeoCoordinates(geoCoordinates);
      // const geoCoordinates: Location | null = await getLocationAddressDetails();
      // setLoggedInUser({
      //   ...loggedInUser,
      //   location: { ...loggedInUser.location, geoCoordinates },
      // });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    // TODO: check it later
    const getEncryptedData = async (storedEncryptedUserData: string) => {
      const decryptedUserData = await highDecryptData(storedEncryptedUserData);
      console.log({ decryptedUserData });
    };
    if (isUserLoggedIn()) {
      const storedEncryptedUserData = getLocalStorageKeyData(ENC_USER_DATA_KEY);
      if (storedEncryptedUserData) {
        const decryptedUserData = decryptData(storedEncryptedUserData);
        setLoggedInUser({ ...decryptedUserData });
      }
    }
  }, []);

  useEffect(() => {
    // setLoggedInUser(loggedInUser);
    getUserGeolocation();
    setCities(citiesData);
  }, []);

  useEffect(() => {
    (async () => {
      await getTotalUserProfiles();
    })();
  }, [getTotalUserProfiles]);

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
      <NextTopLoader color="red" showSpinner={false} />

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
