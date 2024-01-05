// stores/headerStore.ts
// import { mockUsers } from "@/pages/api/mock/testDatas/mockUsers";
import { create } from "zustand";
import { DatingStore, IAlertProps } from "./typings";
import { getAllDBUSers } from "@/api/siteApis";
import { GeoCoordinates } from "@/utils/models";
import { isUserLoggedIn } from "@/utils/authUtils";

const initialState = {
  users: [],
  totalUserProfiles: [],
  currentUserProfiles: [],
  cities: [],
  loggedInUser: null,
  isLoggedIn: isUserLoggedIn(),
  isLoading: false,
  error: null,
  currentCity: "",
  currentPage: "/",
  alertProps: null,
  userGeoCoordinates: null,
};

export const useDatingStore = create<DatingStore>((set, get) => ({
  users: initialState.users,
  totalUserProfiles: initialState.totalUserProfiles,
  currentUserProfiles: initialState.currentUserProfiles,
  cities: initialState.cities,
  loggedInUser: initialState.loggedInUser,
  isLoggedIn: initialState.isLoggedIn,
  isLoading: initialState.isLoading,
  error: initialState.error,
  currentCity: initialState.currentCity,
  currentPage: initialState.currentPage,
  alertProps: initialState.alertProps,
  userGeoCoordinates: initialState.userGeoCoordinates,
  setUserGeoCoordinates: (userGeoCoordinates: GeoCoordinates | null) =>
    set({ userGeoCoordinates }),
  setAlertProps: (alertProps: IAlertProps | null) => set({ alertProps }),
  setCurrentPage: (pageName: string) => set({ currentPage: pageName }),
  setCurrentCity: (city) => set({ currentCity: city }),
  setUsers: (users) => set({ users: users }),
  setCities: (cities) => set({ cities: cities }),
  setIsLoggedIn: (isLogin) => set({ isLoggedIn: isLogin }),
  setLoggedInUser: (user) => set({ loggedInUser: user }),
  getTotalUserProfiles: async (users?) => {
    try {
      set({ isLoading: true });
      // modify this get users for the given city
      const resAllUsers = await getAllDBUSers();
      // set({ currentUserProfiles: resAllUsers }),
      set({
        isLoading: false,
        totalUserProfiles: resAllUsers,
      });
    } catch (err: any) {
      set({ error: err?.message, isLoading: false });
    }
  },
  setCurrentUserProfiles: (currentUsers) =>
    set({ currentUserProfiles: currentUsers }),
}));
