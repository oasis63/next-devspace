import UserProfile from "@/components/UserProfile/UserProfile";
import { useDatingStore } from "@/store";

const Profile = () => {
  const { loggedInUser } = useDatingStore();

  return <UserProfile user={loggedInUser || undefined} />;
};

export default Profile;
