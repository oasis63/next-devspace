// components/Header.tsx

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Stack,
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
import { useDatingStore } from "@/store";
import {
  filterProfilesForGivenIds,
  filterUserProfiles,
  profilesForGivenIds,
} from "@/utils/helpers";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logout from "../Logout/Logout";
import { isUserLoggedIn } from "@/utils/authUtils";

const Header = () => {
  const router = useRouter();

  const {
    loggedInUser,
    totalUserProfiles,
    isLoggedIn,
    userGeoCoordinates,
    setCurrentPage,
    setCurrentUserProfiles,
  } = useDatingStore();

  const loadHomePage = () => {
    let filteredUserIds: string[] = [];

    if (loggedInUser) {
      filteredUserIds = [
        ...(loggedInUser?.likedProfiles as string[]),
        ...(loggedInUser?.dislikedProfiles as string[]),
      ];
    }

    setCurrentUserProfiles(
      filterProfilesForGivenIds(totalUserProfiles, filteredUserIds)
    );
    setCurrentPage("/");
    router.push("/");
  };

  const showDislikedProfiles = () => {
    // setCurrentUserProfiles(
    //   filterUserProfiles(totalUserProfiles, loggedInUser, "disliked")
    // );

    setCurrentUserProfiles(
      profilesForGivenIds(totalUserProfiles, [
        ...((loggedInUser?.dislikedProfiles || []) as string[]),
      ])
    );
    setCurrentPage("/disliked");
    router.push({
      pathname: "/",
      query: { profiles: "disliked" },
    });
  };

  const showLikedProfiles = () => {
    // setCurrentUserProfiles(
    //   filterUserProfiles(totalUserProfiles, loggedInUser, "liked")
    // );

    setCurrentUserProfiles(
      profilesForGivenIds(totalUserProfiles, [
        ...((loggedInUser?.likedProfiles || []) as string[]),
      ])
    );

    setCurrentPage("/liked");
    router.push({
      pathname: "/",
      query: { profiles: "liked" },
    });
  };

  // State for handling dropdown menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigateToLogin = () => {
    router.push("/login");
  };

  const navigateToRegister = () => {
    router.push("/register");
  };

  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <Typography variant="h6" component="div" className={styles.title}>
          {/* Dating App */}
          <Button variant="outlined" onClick={loadHomePage}>
            Dating App
          </Button>

          {/* {!loggedInUser?.location?.geoCoordinates?.latitude ? ( */}
          {!userGeoCoordinates?.latitude ? (
            "Location loading"
          ) : (
            <Typography>
              {/* Lat : {loggedInUser?.location?.geoCoordinates?.latitude} {"  "}
              Long : {loggedInUser?.location?.geoCoordinates?.longitude} */}
              Lat : {userGeoCoordinates?.latitude} {"  "}
              Long : {userGeoCoordinates?.longitude}
            </Typography>
          )}
        </Typography>
        <SearchBar />
        <FilterByCity />
        <IconButton color="inherit" onClick={loadHomePage}>
          <HomeIcon />
        </IconButton>
        {isLoggedIn && loggedInUser && (
          <>
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
            <Link href="/profile">
              <ProfileAvatar profilePhotoUrl={loggedInUser?.profilePhotoUrl} />
            </Link>
            <IconButton
              color="inherit"
              onClick={handleMenuClick}
              aria-controls="profile-menu"
              aria-haspopup="true"
            >
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem>
                <Logout />
              </MenuItem>
            </Menu>
          </>
        )}
        {(!loggedInUser || !isLoggedIn) && (
          <Stack flexDirection={"row"}>
            <Button variant="contained" onClick={navigateToLogin}>
              Log In
            </Button>
            <Button variant="contained" onClick={navigateToRegister}>
              Register
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
