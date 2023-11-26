// components/Header.tsx

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import Link from "next/link";
import styles from "./Header.module.scss";
import SearchBar from "../SearchBar/SearchBar";
import FilterByCity from "../FilterByCity/FilterByCity";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import AccountCircleIcon
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import { useRouter } from "next/router";
import { useDatingStore, useHeaderStore } from "@/store";
import { filterProfilesForGivenIds, filterUserProfiles } from "@/utils/helpers";

const Header = () => {
  const router = useRouter();

  const {
    loggedInUser,
    cities,
    totalUserProfiles,
    currentUserProfiles,
    setCurrentUserProfiles,
  } = useDatingStore();

  const loadHomePage = () => {
    setCurrentUserProfiles(
      filterProfilesForGivenIds(totalUserProfiles, [
        ...loggedInUser?.likedProfiles,
        ...loggedInUser?.dislikedProfiles,
      ])
    );
    router.push("/");
  };

  const showDislikedProfiles = () => {
    setCurrentUserProfiles(
      filterUserProfiles(totalUserProfiles, loggedInUser, "disliked")
    );
    router.push({
      pathname: "/",
      query: { profiles: "disliked" },
    });
  };

  const showLikedProfiles = () => {
    setCurrentUserProfiles(
      filterUserProfiles(totalUserProfiles, loggedInUser, "liked")
    );
    router.push({
      pathname: "/",
      query: { profiles: "liked" },
    });
  };

  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <Typography variant="h6" component="div" className={styles.title}>
          {/* Dating App */}
          <Button variant="outlined" onClick={loadHomePage}>
            Dating App
          </Button>

          {!loggedInUser?.location?.geoCoordinates?.latitude ? (
            "Location loading"
          ) : (
            <Typography>
              Lat : {loggedInUser?.location?.geoCoordinates?.latitude} {"  "}
              Long : {loggedInUser?.location?.geoCoordinates?.longitude}
            </Typography>
          )}
        </Typography>
        <SearchBar />
        <FilterByCity />
        {/* Liked Profiles Button */}{" "}
        {/* <IconButton color="inherit" onClick={onDislikedProfilesClick}> */}
        <IconButton color="inherit" onClick={showLikedProfiles}>
          <Badge
            badgeContent={loggedInUser?.likedProfiles?.length || 0}
            color="error"
          >
            <FavoriteIcon />
          </Badge>
        </IconButton>
        {/* Disliked Profiles Button */}
        <IconButton color="inherit" onClick={showDislikedProfiles}>
          <Badge
            badgeContent={loggedInUser?.dislikedProfiles?.length || 0}
            color="error"
          >
            <ThumbDownIcon />
          </Badge>
        </IconButton>
        {/* <Link href="/"> */}
        <IconButton color="inherit" onClick={loadHomePage}>
          <HomeIcon />
        </IconButton>
        {/* </Link> */}
        {/* Profile Link with Profile Photo */}
        <Link href="/profile">
          <ProfileAvatar profilePhotoUrl={loggedInUser?.profilePhotoUrl} />
        </Link>
        {/* Add more navigation links as needed */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
