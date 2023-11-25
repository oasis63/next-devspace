import crypto from "crypto";
import { User } from "./models";

export function generateSecureUserId() {
  // Generate a random string using Node.js crypto module
  const randomString = crypto.randomBytes(16).toString("hex");

  // Add a timestamp for uniqueness
  const timestamp = Date.now().toString();

  // Combine random string and timestamp to create a more secure userId
  const secureUserId = `${randomString}-${timestamp}`;

  return randomString; // for now not adding timestamp to the userId
}

export const filterUserProfiles = (
  allUsers: User[],
  loggedInUser: User | null,
  filterType: string,
  cityName?: string
) => {
  if (filterType == "filterByCity") {
    console.log("filterByCity ");
    console.log(cityName);
    if (!cityName) return allUsers;
    return allUsers.filter((user) => user?.location?.city == cityName);
  } else if (filterType == "liked") {
    return allUsers.filter((user) =>
      loggedInUser?.likedProfiles?.includes(user.userId)
    );
  } else if (filterType == "disliked") {
    return allUsers.filter((user) =>
      loggedInUser?.dislikedProfiles?.includes(user.userId)
    );
  } else {
    return allUsers;
  }
};
