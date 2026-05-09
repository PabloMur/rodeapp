import { atom } from "recoil";
import type { TripData } from "@/types";

export const menuAtom = atom({
  key: "menuAtom",
  default: false,
});

export const userLocation = atom({
  key: "userLocationAtom",
  default: {},
});

export const loaderAtom = atom({
  key: "loaderAtom",
  default: false,
});

export const lastListID = atom({
  key: "lastListID",
  default: "",
});

export const deleteListModal = atom({
  key: "deleteListModal",
  default: false,
});

export const activeTripAtom = atom<TripData | null>({
  key: "activeTripAtom",
  default: null,
});

export const createTripModalAtom = atom({
  key: "createTripModalAtom",
  default: false,
});
