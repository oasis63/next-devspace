// pages/index.tsx
import UserList from "@/components/UserList/UserList";
import { useDatingStore } from "@/store";

const Home = () => {
  const totalUserProfiles = useDatingStore((store) => store.totalUserProfiles);
  const currentUserProfiles = useDatingStore(
    (store) => store.currentUserProfiles
  );
  return (
    <>
      <UserList users={currentUserProfiles} />
    </>
  );
};

export default Home;
