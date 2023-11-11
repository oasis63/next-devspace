// components/UserProfile.tsx

import { Typography } from "@mui/material";
import styles from "./UserProfile.module.scss";
import { User } from "@/utils/models";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className={styles.container}>
      <Typography variant="h2">{user.name}'s Profile</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      {/* <h2>{user.name}'s Profile</h2> */}
      {/* <p>Email: {user.email}</p> */}
      {/* Add more user details here */}
    </div>
  );
};

export default UserProfile;
