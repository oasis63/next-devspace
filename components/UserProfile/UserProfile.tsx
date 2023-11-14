// components/UserProfile.tsx

import styles from "./UserProfile.module.scss";
import { User } from "@/utils/models";
import { Container, Typography, Avatar, Grid } from "@mui/material";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <Container className={styles.container}>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar
            className={styles.avatar}
            src={user?.photos?.[0]}
            alt={user.name}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h4">{user.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Age: {user.age}</Typography>
              <Typography variant="body1">
                Location: {user.location?.city}
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
    </Container>
  );
};

export default UserProfile;
