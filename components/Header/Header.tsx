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
import { User } from "@/utils/models";

interface HeaderProps {
  cities: string[];
  likedProfilesCount: number;
  dislikedProfilesCount: number;
  loggedInUser: User;
  onCityFilterChange: (selectedCity: string) => void;
  onLikedProfilesClick: (e: any) => void;
  onDislikedProfilesClick: (e: any) => void;
}

const Header: React.FC<HeaderProps> = ({
  cities,
  loggedInUser,
  likedProfilesCount,
  dislikedProfilesCount,
  onCityFilterChange,
  onLikedProfilesClick,
  onDislikedProfilesClick,
}) => {
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <Typography variant="h6" component="div" className={styles.title}>
          Dating App
        </Typography>
        <SearchBar />
        <FilterByCity cities={cities} onFilterChange={onCityFilterChange} />

        {/* Liked Profiles Button */}
        <IconButton color="inherit" onClick={onLikedProfilesClick}>
          <Badge badgeContent={likedProfilesCount} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>

        {/* Disliked Profiles Button */}
        <IconButton color="inherit" onClick={onDislikedProfilesClick}>
          <Badge badgeContent={dislikedProfilesCount} color="error">
            <ThumbDownIcon />
          </Badge>
        </IconButton>

        {/* <Link href="/">
          <Button color="inherit">Home</Button>
        </Link>
        <Link href="/profile">
          <Button color="inherit">Profile</Button>
        </Link> */}
        {/* Home Link */}
        <Link href="/">
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
        </Link>
        {/* Profile Link with Profile Photo */}
        <Link href="/profile">
          <IconButton color="inherit">
            {loggedInUser?.profilePhotoUrl ? (
              <img
                src={loggedInUser?.profilePhotoUrl}
                alt="Profile"
                className={styles.profilePhoto}
              />
            ) : (
              <AccountCircleIcon />
            )}
          </IconButton>
        </Link>
        {/* Add more navigation links as needed */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
