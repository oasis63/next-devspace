// components/ProfileAvatar/ProfileAvatar.tsx

import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import { ProfileAvatarProps } from "./typings";
import Image from "next/image";

const ProfileAvatar = ({ profilePhotoUrl }: ProfileAvatarProps) => {
  return (
    <IconButton color="inherit">
      {profilePhotoUrl ? (
        <Image
          src={profilePhotoUrl}
          alt="Profile"
          width={30}
          height={30}
          style={{
            borderRadius: "50%",
          }}
        />
      ) : (
        <AccountCircleIcon />
      )}
    </IconButton>
  );
};

export default ProfileAvatar;
