// components/UserList.tsx

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  styled,
  Box,
} from "@mui/material";
import { User } from "@/utils/models";
import FeaturedUser from "../FeaturedUser/FeaturedUser";
import UserCard from "../UserCard/UserCard";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const handleConnect = (userId: any) => {
    // Implement your logic to handle connecting with a user
    console.log(`Connect with user ${userId}`);
  };
  return (
    <Container>
      {/* <Typography variant="h4" gutterBottom>
        User List
      </Typography> */}
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item key={user.userId} xs={12} sm={6} md={4}>
            <UserCard
              user={user}
              onConnect={() => handleConnect(user?.userId)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserList;
