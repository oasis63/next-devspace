// faking backend db

interface User {
  id: number;
  name: string;
  email: string;
}

let users: any[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@mail.com",
    password: "$2b$10$qskMtJjMlLJTfInplBk1/OvYLwRZUaoMV3i2AQacKPoNgAuMvvM..",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@mail.com",
    password: "$2b$10$xHycVeVWAy8hptjtR6bW5.NMTSWAV3NN48.Sq76XSmS3J3Ft78DEa", // jane
  },
];

async function addMockUser(newUser: any) {
  users.push(newUser);
}

function getMockUserById(id: number): any {
  return users.find((user) => user.id === id);
}

function getMockUserByEmail(email: string): any {
  return users.find((user) => user.email === email);
}

function getMockUserByUsername(username: string): any {
  return users.find((user) => user.username === username);
}

function checkUserPresence(email: string, username: string) {
  console.log({ email, username });
  const user1 = getMockUserByUsername(username);
  console.log("user1 : ", user1);

  if (username && user1) {
    return {
      message: `Username ${username} already exists. Please choose a different username`,
    };
  }

  const user2 = getMockUserByEmail(email);
  console.log("user2 : ", user2);
  if (email && getMockUserByEmail(email)) {
    return {
      message: `Email ${email} already registered.`,
    };
  }
  return null;
}

function updateUser(id: number, updatedUserData: Partial<User>): void {
  users = users.map((user) =>
    user.id === id ? { ...user, ...updatedUserData } : user
  );
}

function getAllMockUsers(): any[] {
  return users;
}

export {
  addMockUser,
  getAllMockUsers,
  getMockUserById,
  getMockUserByEmail,
  checkUserPresence,
};
