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
    currentPage,
    setLoggedInUser,
    setCurrentUserProfiles,
  } = useDatingStore();

  const removeUsersFromCurrentProfiles = (userId: string) => {
    const fiteredUserProfiles = filterProfilesForGivenIds(currentUserProfiles, [
      userId,
    ]);
    setCurrentUserProfiles([...fiteredUserProfiles]);
  };

  const updateProfile = (
    userId: string,
    likeProperty: string,
    unlikeProperty: string = ""
  ) => {
    if (loggedInUser && loggedInUser?.[likeProperty]) {
      if (unlikeProperty != "") {
        setLoggedInUser({
          ...loggedInUser,
          [likeProperty]: [...loggedInUser?.[likeProperty], userId],
          ...(loggedInUser?.[unlikeProperty]?.includes(userId) && {
            [unlikeProperty]: loggedInUser?.[unlikeProperty].filter(
              (id: string) => id != userId
            ),
          }),
        });
      } else {
        const updatedProfiles = loggedInUser?.[likeProperty].filter(
          (id: string) => id !== userId
        );
        setLoggedInUser({
          ...loggedInUser,
          [likeProperty]: updatedProfiles,
        });
      }
    }
    removeUsersFromCurrentProfiles(userId);
  };

  const handleLike = (userId: string) => {
    updateProfile(userId, "likedProfiles", "dislikedProfiles");
  };
  const handleDislike = (userId: string) => {
    updateProfile(userId, "dislikedProfiles", "likedProfiles");
  };

  const handleRemoveUser = (userId: string) => {
    const likeUnlikeProperty =
      currentPage === "/liked" ? "likedProfiles" : "dislikedProfiles";
    updateProfile(userId, likeUnlikeProperty, "");
  };

  const handleUserChat = (userId: string) => {
    console.log("start chatting with userId : ", userId);
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
                onLike={() => user?.userId && handleLike(user?.userId)}
                onDislike={() => user?.userId && handleDislike(user?.userId)}
                onRemove={() => user?.userId && handleRemoveUser(user?.userId)}
                onMessage={() => user?.userId && handleUserChat(user?.userId)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default UserList;
