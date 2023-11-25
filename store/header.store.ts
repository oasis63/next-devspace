// stores/headerStore.ts
import { User } from "@/utils/models";
import { create } from "zustand";

interface HeaderStore {
  // likedProfilesCount: number;
  // dislikedProfilesCount: number;
  // loggedInUser: User | null;
  // setLikedProfilesCount: (count: number) => void;
  // setDislikedProfilesCount: (count: number) => void;
  // cities: string[];
  // setCities: (cities: string[]) => void;
  // setLoggedInUser: (user: User | null) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  // likedProfilesCount: 0,
  // dislikedProfilesCount: 0,
  // loggedInUser: null,
  // setLikedProfilesCount: (count) => set({ likedProfilesCount: count }),
  // setDislikedProfilesCount: (count) => set({ dislikedProfilesCount: count }),
  // cities: [],
  // setCities: (cities) => set({ cities: cities }),
  // setLoggedInUser: (user) => set({ loggedInUser: user }),
}));
