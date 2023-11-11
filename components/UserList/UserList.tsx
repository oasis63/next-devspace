// components/UserList.tsx

import { User } from "@/utils/models";
import React from "react";
import Link from "next/link";
import styles from "./UserList.module.scss";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <ul className={styles.userList}>
      {users.map((user) => (
        <li key={user.userId} className={styles.userListItem}>
          <Link href={`/profile/${user.userId}`}>{user.name}</Link>
        </li>
        // Display other user details as needed
      ))}
    </ul>
  );
};

export default UserList;
