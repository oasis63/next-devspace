// components/UserList.tsx

import { Container, Grid } from "@mui/material";
import UserCard from "../UserCard/UserCard";
import { UserListProps } from "./typings";
import { useDatingStore } from "@/store";
import { filterProfilesForGivenIds } from "@/utils/helpers";

const UserList = () => {
  const {
    loggedInUser,
    currentUserProfiles,
    totalUserProfiles,
    setLoggedInUser,
    setCurrentUserProfiles,
  } = useDatingStore();

  const removeUsersFromCurrentProfiles = (userId: string) => {
    const fiteredUserProfiles = filterProfilesForGivenIds(currentUserProfiles, [
      userId,
    ]);
    setCurrentUserProfiles([...fiteredUserProfiles]);
  };

  const handleLike = (userId: any) => {
    // Implement your logic to handle connecting with a user
    console.log(`Liked the user ${userId}`);

    if (loggedInUser && loggedInUser.likedProfiles) {
      setLoggedInUser({
        ...loggedInUser,
        likedProfiles: [...loggedInUser.likedProfiles, userId],
      });
    }
    removeUsersFromCurrentProfiles(userId);
  };
  const handleDislike = (userId: any) => {
    // Implement your logic to handle connecting with a user
    console.log(`Dislike the user ${userId}`);
    if (loggedInUser && loggedInUser.dislikedProfiles) {
      setLoggedInUser({
        ...loggedInUser,
        dislikedProfiles: [...loggedInUser.dislikedProfiles, userId],
      });
    }
    removeUsersFromCurrentProfiles(userId);
  };
  return (
    <Container>
      {!currentUserProfiles ? (
        "Profiles are loading"
      ) : currentUserProfiles.length == 0 ? (
        "No profiles"
      ) : (
        <Grid container spacing={2}>
          {currentUserProfiles?.map((user) => (
            <Grid item key={user.userId} xs={12} sm={6} md={4}>
              <UserCard
                user={user}
                onLike={() => handleLike(user?.userId)}
                onDislike={() => handleDislike(user?.userId)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default UserList;
