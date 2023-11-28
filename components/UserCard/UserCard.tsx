// components/UserCard.tsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  styled,
  IconButton,
} from "@mui/material";
import { User } from "@/utils/models";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { UserCardProps } from "./typings";

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

const ActionButtonsContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "16px",
});

// round back buttons ,
const RoundButton = styled(Button)({
  backgroundColor: "#fff",
  borderRadius: "50%",
  padding: "8px",
  minWidth: "0",
});

const LikeButton = styled(RoundButton)({
  // backgroundColor: "#e0f2f1",
  "&:hover": {
    backgroundColor: "#e0f2f1",
  },
});

const DislikeButton = styled(RoundButton)({
  // backgroundColor: "#ffebee",
  "&:hover": {
    backgroundColor: "#ffebee",
  },
});

const ConnectButton = styled(Button)({
  marginTop: "16px",
});

const UserCard: React.FC<UserCardProps> = ({ user, onLike, onDislike }) => {
  return (
    <StyledUserCard>
      <UserAvatar src={user?.photos?.[0]} alt={user.name} />
      <Typography variant="h6">{user.name}</Typography>
      <Typography variant="body2">Age: {user.age}</Typography>
      <Typography variant="body2">Location: {user?.location?.city}</Typography>
      <UserInterests>Interests: {user?.interests?.join(", ")}</UserInterests>
      <ActionButtonsContainer>
        <IconButton color="secondary" onClick={onDislike}>
          <ThumbDownIcon />
        </IconButton>
        <IconButton color="primary" onClick={onLike}>
          <FavoriteIcon />
        </IconButton>
      </ActionButtonsContainer>

      {/* <ActionButtonsContainer>
        <DislikeButton onClick={onDislike}>
          <CloseIcon />
        </DislikeButton>
        <LikeButton onClick={onLike}>
          <CheckIcon />
        </LikeButton>
      </ActionButtonsContainer> */}
    </StyledUserCard>
  );
};

export default UserCard;
