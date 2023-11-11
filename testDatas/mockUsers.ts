import { User } from "@/utils/models";

export const mockUsers: User[] = [
  {
    userId: "1",
    username: "john_doe",
    name: "John Doe",
    age: 28,
    email: "john.doe@example.com",
    phone: "123-456-7890",
    location: {
      city: "New York",
      state: "NY",
      country: "USA",
    },
    interests: ["Reading", "Hiking", "Photography"],
    matchingPreference: {
      age: {
        min: 25,
        max: 35,
      },
      gender: "Female",
      distance: 50,
    },
    photos: ["https://reqres.in/img/faces/1-image.jpg"],
    password: "securePassword1",
  },
  {
    userId: "2",
    username: "jane_smith",
    name: "Jane Smith",
    age: 32,
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    location: {
      city: "Los Angeles",
      state: "CA",
      country: "USA",
    },
    interests: ["Traveling", "Cooking", "Music"],
    matchingPreference: {
      age: {
        min: 28,
        max: 38,
      },
      gender: "Male",
      distance: 40,
    },
    photos: ["https://reqres.in/img/faces/2-image.jpg"],
    password: "strongPassword123",
  },
  {
    userId: "3",
    username: "alice_wonder",
    name: "Alice Wonderland",
    age: 22,
    email: "alice.wonder@example.com",
    phone: "555-123-4567",
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA",
    },
    interests: ["Painting", "Running", "Movies"],
    matchingPreference: {
      age: {
        min: 20,
        max: 30,
      },
      gender: "Other",
      distance: 60,
    },
    photos: ["https://reqres.in/img/faces/3-image.jpg"],
    password: "securePass789",
  },
  {
    userId: "4",
    username: "bob_adventurer",
    name: "Bob Adventurer",
    age: 40,
    email: "bob.adventurer@example.com",
    phone: "789-321-6540",
    location: {
      city: "Denver",
      state: "CO",
      country: "USA",
    },
    interests: ["Camping", "Gaming", "Technology"],
    matchingPreference: {
      age: {
        min: 35,
        max: 45,
      },
      gender: "Male",
      distance: 30,
    },
    photos: ["https://reqres.in/img/faces/5-image.jpg"],
    password: "pass1234",
  },
];
