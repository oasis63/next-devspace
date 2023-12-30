import { customFetch } from "@/utils/customFetch";

export const getAllDBUSers = async () => {
  const response = await customFetch({
    url: "/api/mockUsersApi",
  });
  return response?.data || [];
};

// get the users based on city , gender, distance , interests
