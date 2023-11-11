// components/UserCard.tsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  styled,
} from "@mui/material";
import { User } from "@/utils/models";

interface UserCardProps {
  user: User;
  onConnect: () => void; // Callback function for the connect button
}

const StyledUserCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
});

const UserAvatar = styled(Avatar)({
  width: "80px",
  height: "80px",
  margin: "0 auto 16px",
});

const UserInterests = styled(Typography)({
  marginTop: "16px",
  fontStyle: "italic",
});

const ConnectButton = styled(Button)({
  marginTop: "16px",
});

const UserCard: React.FC<UserCardProps> = ({ user, onConnect }) => {
  return (
    <StyledUserCard>
      <UserAvatar src={user?.photos?.[0]} alt={user.name} />
      <Typography variant="h6">{user.name}</Typography>
      <Typography variant="body2">Age: {user.age}</Typography>
      <Typography variant="body2">Location: {user?.location?.city}</Typography>
      <UserInterests>Interests: {user?.interests?.join(", ")}</UserInterests>
      <ConnectButton variant="contained" color="primary" onClick={onConnect}>
        Connect
      </ConnectButton>
    </StyledUserCard>
  );
};

export default UserCard;
