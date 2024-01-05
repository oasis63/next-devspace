import Sidebar from "@/components/Sidebar/Sidebar";
import UserProfile from "@/components/UserProfile/UserProfile";
import { useDatingStore } from "@/store";
import { Container, Grid } from "@mui/material";

const Profile = () => {
  const { loggedInUser } = useDatingStore();

  return (
    <Container>
      <Grid container>
        <Grid item sm={2} md={2} lg={2}>
          <Sidebar />
        </Grid>
        <Grid item sm={10} md={10} lg={10}>
          <UserProfile user={loggedInUser || undefined} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
