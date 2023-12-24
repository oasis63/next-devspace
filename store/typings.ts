import { User } from "@/utils/models";
import { AlertColor } from "@mui/material";

export interface IAlertProps {
  message: string;
  severity: AlertColor;
}

export interface DatingStore {
  users: User[];
  totalUserProfiles: User[];
  currentUserProfiles: User[];
  cities: string[];
  currentCity: string;
  loggedInUser: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: any;
  currentPage: string;
  alertProps: IAlertProps | null;
  setCurrentPage: (pageName: string) => void;
  setCurrentCity: (city: string) => void;
  setUsers: (users: User[]) => void;
  getTotalUserProfiles: (users?: User[]) => void;
  setCurrentUserProfiles: (currentUsers: User[]) => void;
  setCities: (cities: string[]) => void;
  setLoggedInUser: (user: User | null) => void;
  setIsLoggedIn: (isLogin: boolean) => void;
  setAlertProps: (alertMessage: IAlertProps | null) => void;
}
