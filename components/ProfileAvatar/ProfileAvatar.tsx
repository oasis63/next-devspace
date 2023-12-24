// components/ProfileAvatar/ProfileAvatar.tsx

import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import styles from "./ProfileAvatar.module.scss";
import { ProfileAvatarProps } from "./typings";
import Image from "next/image";

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ profilePhotoUrl }) => {
  return (
    <IconButton color="inherit">
      {profilePhotoUrl ? (
        <Image
          src={profilePhotoUrl}
          alt="Profile"
          className={styles.profilePhoto}
        />
      ) : (
        <AccountCircleIcon />
      )}
    </IconButton>
  );
};

export default ProfileAvatar;
