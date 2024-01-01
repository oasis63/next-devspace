// components/UserList.tsx

import { Container, Grid } from "@mui/material";
import UserCard from "../UserCard/UserCard";
import { UserListProps } from "./typings";
import { useDatingStore } from "@/store";
import { filterProfilesForGivenIds } from "@/utils/helpers";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isUserLoggedIn } from "@/utils/authUtils";

const UserList = () => {
  const router = useRouter();

  const {
    isLoggedIn,
    loggedInUser,
    currentUserProfiles,
    totalUserProfiles,
    currentPage,
    setAlertProps,
    setLoggedInUser,
    setCurrentUserProfiles,
  } = useDatingStore();

  const notLoggedInUserState = () => {
    setAlertProps({
      message: "Login for this action",
      severity: "warning",
    });
    // router.push("/login");
  };

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

  const handleLikeDislike = (userId: string, actionType: string) => {
    if (!isLoggedIn) {
      notLoggedInUserState();
      return;
    }
    const complementActionType =
      actionType == "dislikedProfiles" ? "likedProfiles" : "dislikedProfiles";
    updateProfile(userId, actionType, complementActionType);
  };

  const handleRemoveUser = (userId: string) => {
    if (!isLoggedIn) {
      notLoggedInUserState();
      return;
    }
    const likeUnlikeProperty =
      currentPage === "/liked" ? "likedProfiles" : "dislikedProfiles";
    updateProfile(userId, likeUnlikeProperty, "");
  };

  const handleUserChat = (userId: string) => {
    if (!isLoggedIn) {
      notLoggedInUserState();
      return;
    }
    console.log("start chatting with userId : ", userId);
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      setCurrentUserProfiles(
        filterProfilesForGivenIds(totalUserProfiles, [
          ...((loggedInUser?.dislikedProfiles || []) as string[]),
          ...((loggedInUser?.likedProfiles || []) as string[]),
        ])
      );
    } else {
      setCurrentUserProfiles([...totalUserProfiles]);
    }
  }, [totalUserProfiles]);

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
                onLike={() =>
                  user?.userId &&
                  handleLikeDislike(user?.userId, "likedProfiles")
                }
                onDislike={() =>
                  user?.userId &&
                  handleLikeDislike(user?.userId, "dislikedProfiles")
                }
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
