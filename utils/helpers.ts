import crypto from "crypto";
import { GeoCoordinates, Location, User } from "./models";

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

// Function to convert degrees to radians
export const toRadians = (degree: number): number => {
  return (degree * Math.PI) / 180;
};

// Function to calculate distance between two points using Haversine formula
export const calculateDistance = (
  point1: GeoCoordinates,
  point2: GeoCoordinates
): number => {
  const R = 6371; // Earth radius in kilometers
  const dLat = toRadians(point2?.latitude - point1?.latitude);
  const dLon = toRadians(point2?.longitude - point1?.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1?.latitude)) *
      Math.cos(toRadians(point2?.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

export const getGeoCoordinates = async (): Promise<GeoCoordinates> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(new Error(`Error getting location: ${error.message}`));
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by your browser"));
    }
  });
};

const apiKey = "3b22d9facf4240cfa9566ecfcab32b7c"; //opencagedata
// const city = "New York"; // Replace with the desired city

const getCoordinates = async (city: string) => {
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    city
  )}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.results.length > 0) {
      const { latitude, longitude } = data.results[0]
        .geometry as GeoCoordinates;
      console.log(
        `Coordinates for ${city}: Latitude ${latitude}, Longitude ${longitude}`
      );
    } else {
      console.error(`No results found for ${city}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call the function to get coordinates
// getCoordinates("New York");

const getCityName = async (
  location: GeoCoordinates
): Promise<Location | null> => {
  const { latitude, longitude } = location;
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.results.length > 0) {
      const addressComponents: Location = {};
      const { components } = data.results[0];

      if (components.city) {
        addressComponents.city = components.city;
      }

      if (components.state) {
        addressComponents.state = components.state;
      }

      if (components.country) {
        addressComponents.country = components.country;
      }

      return addressComponents;
    } else {
      console.error("No results found for the given coordinates");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Example: Get city name for a specific location
const location: GeoCoordinates = {
  latitude: 40.748817,
  longitude: -73.985428,
};

getCityName(location).then((addressComponents) => {
  if (addressComponents) {
    console.log("City Name:", addressComponents.city);
    console.log("State:", addressComponents.state);
    console.log("Country:", addressComponents.country);
  }
});
