import { IncomingMessage } from "http";
import { customFetch } from "@/utils/customFetch";
import { User } from "@/utils/models";

export const getAllDBUSers = async () => {
  const response = await customFetch({
    url: "/api/mockUsersApi",
  });
  return response?.data || [];
};

// get user data by email id
export const getUserEmailId = async () => {
  const response = await customFetch({
    url: "/api/mockUsersApi",
  });
  return response?.data || [];
};

export const getUserDataByJwtToken = async (token: string) => {
  const response = await fetch(
    "http://localhost:3000/api/protected-sample-api",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  const data = await response.json();
  return data;
};

// utils/auth.ts

export async function checkUserLogin(
  req: IncomingMessage
): Promise<{ isLoggedIn: boolean; userData: any }> {
  const cookies = req.headers.cookie || "";
  // Parse cookies into an object
  const cookiesObject: Record<string, string> = cookies
    .split(";")
    .reduce((acc: Record<string, string>, cookie: string) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});

  const isLoggedIn: boolean = !!cookiesObject["token"];

  let userData = null;
  if (isLoggedIn && cookiesObject["token"]) {
    userData = await getUserDataByJwtToken(cookiesObject["token"]);
  }

  return { isLoggedIn: isLoggedIn, userData: userData };
}
