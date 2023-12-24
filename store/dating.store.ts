// stores/headerStore.ts
import { mockUsers } from "@/testDatas/mockUsers";
import { isUserLoggedIn } from "@/utils/helpers";
import { create } from "zustand";
import { DatingStore, IAlertProps } from "./typings";

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
  setAlertProps: (alertProps: IAlertProps | null) => set({ alertProps }),
  setCurrentPage: (pageName: string) => set({ currentPage: pageName }),
  setCurrentCity: (city) => set({ currentCity: city }),
  setUsers: (users) => set({ users: users }),
  setCities: (cities) => set({ cities: cities }),
  setIsLoggedIn: (isLogin) => set({ isLoggedIn: isLogin }),
  setLoggedInUser: (user) => set({ loggedInUser: user }),
  getTotalUserProfiles: async (users?) => {
    // async
    // get all the user profiles for the given city or given area range
    try {
      set({ isLoading: true });
      // const response = await fetch("/api/users/crudUsers");
      // console.log("total user profilesisLoggedIn response ", response);
      // set({ isLoggedIn: true });
      set({
        isLoading: false,
        totalUserProfiles: mockUsers,
        // currentUserProfiles: mockUsers,
      });
      // console.log(
      //   "total user profiles totalUserProfiles ",
      //   get().totalUserProfiles
      // );
    } catch (err: any) {
      set({ error: err?.message, isLoading: false });
    }
  },
  setCurrentUserProfiles: (currentUsers) =>
    set({ currentUserProfiles: currentUsers }),
}));
