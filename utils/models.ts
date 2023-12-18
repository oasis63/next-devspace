export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  geoCoordinates?: GeoCoordinates;
  city?: string;
  state?: string;
  country?: string;
  postcode?: string;
}

export interface User {
  userId?: string;
  username?: string;
  name?: string;
  age?: number;
  email?: string;
  phone?: string;
  location?: Location;
  interests?: string[];
  matchingPreference?: {
    age?: {
      min?: number;
      max?: number;
    };
    gender?: string;
    distance?: number;
  };
  photos?: string[]; // string arrays of base64 values
  profilePhotoUrl?: string;
  password?: string;
  likedProfiles?: string[];
  dislikedProfiles?: string[];
  [key: string]: any;
}
