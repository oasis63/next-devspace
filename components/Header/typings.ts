import { User } from "@/utils/models";

export interface HeaderProps {
  // cities?: string[];
  // likedProfilesCount?: number;
  // dislikedProfilesCount?: number;
  // loggedInUser?: User;
  onCityFilterChange: (selectedCity: string) => void;
  // onLikedProfilesClick: (e: any) => void;
  // onDislikedProfilesClick: (e: any) => void;
}
