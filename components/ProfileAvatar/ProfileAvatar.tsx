// components/ProfileAvatar/ProfileAvatar.tsx

import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";

interface ProfileAvatarProps {
  profilePhotoUrl?: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ profilePhotoUrl }) => {
  return (
    <IconButton color="inherit">
      {profilePhotoUrl ? (
        <img src={profilePhotoUrl} alt="Profile" className="profile-photo" />
      ) : (
        <AccountCircleIcon />
      )}
    </IconButton>
  );
};

export default ProfileAvatar;
