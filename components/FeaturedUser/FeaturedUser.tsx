// components/FeaturedUser.tsx

import React from "react";
import {
  Container,
  Typography,
  Avatar,
  Button,
  Grid,
  styled,
} from "@mui/material";
import { User } from "@/utils/models";
import { FeaturedUserProps } from "./typings";

const FeaturedUserContainer = styled(Container)({
  marginTop: "32px",
  padding: "32px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  textAlign: "center",
});

const FeaturedUserAvatar = styled(Avatar)({
  width: "120px",
  height: "120px",
  margin: "0 auto 16px",
});

const FeaturedUserInterests = styled(Typography)({
  marginTop: "16px",
  fontStyle: "italic",
});

const FeaturedUser = ({ user }: FeaturedUserProps) => {
  return (
    <FeaturedUserContainer>
      <FeaturedUserAvatar src={user?.photos?.[0]} alt={user.name} />
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="body2">Age: {user.age}</Typography>
      <Typography variant="body2">Location: {user?.location?.city}</Typography>
      <FeaturedUserInterests>
        Interests: {user?.interests?.join(", ")}
      </FeaturedUserInterests>
      <Button variant="contained" color="primary">
        Connect with {user.name}
      </Button>
    </FeaturedUserContainer>
  );
};

export default FeaturedUser;
