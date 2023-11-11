export interface User {
  userId?: string;
  username?: string;
  name?: string;
  age?: number;
  email?: string;
  phone?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  interests?: string[];
  matchingPreference?: {
    age?: {
      min?: number;
      max?: number;
    };
    gender?: "Male" | "Female" | "Other";
    distance?: number;
  };
  photos?: string[]; // string arrays of base64 values
  password?: string;
}
