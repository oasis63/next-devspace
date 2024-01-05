// components/UserProfile.tsx

import React from "react";
import styles from "./UserProfile.module.scss";
import { User } from "@/utils/models";
import { Container, Typography, Avatar, Grid, Paper } from "@mui/material";
import { UserProfileProps } from "./typings";
import Image from "next/image";

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    // <Container className={styles.container}>
    <Paper elevation={0}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <Image
            src={user?.profilePhotoUrl || ""}
            alt={user?.name || ""}
            width={100}
            height={100}
          />
        </Grid>
        <Grid item xs={10} container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h4">{user?.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Age: {user?.age}</Typography>
              <Typography variant="body1">Email: {user?.email}</Typography>
              <Typography variant="body1">Phone: {user?.phone}</Typography>
              <Typography variant="body1">
                Location: {user?.location?.city}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Interests: {user?.interests?.join(", ")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    // </Container>
  );
};

export default UserProfile;
