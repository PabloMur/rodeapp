import { useParams, useRouter } from "next/navigation";
import { deleteListModal, lastListID, loaderAtom, menuAtom } from "@/atoms";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  APIDeleteList,
  APIGetListData,
  APIUpdateListItems,
  APIGetActiveTrip,
  APICreateTrip,
  APIEndTrip,
  createList,
  getUserLists,
  getWeather,
} from "@/lib/APICalls";
import { activeTripAtom, createTripModalAtom, lastCompletedTripAtom } from "@/atoms";

interface Location {
  latitude: any;
  longitude: any;
}

interface GeolocationHook {
  weatherData: Location | null;
  error: string | null;
}

const DEFAULT_COORDS = { latitude: -34.6037, longitude: -58.3816 };

export function useGeolocation(): GeolocationHook {
  const [weatherData, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = async (latitude: number, longitude: number) => {
      const weather = (await getWeather(latitude, longitude)) as any;
      if (!cancelled) setLocation(weather);
    };

    const fallbackTimer = setTimeout(() => {
      if (!cancelled) fetchWeather(DEFAULT_COORDS.latitude, DEFAULT_COORDS.longitude);
    }, 6000);

    if (!navigator?.geolocation) {
      clearTimeout(fallbackTimer);
      fetchWeather(DEFAULT_COORDS.latitude, DEFAULT_COORDS.longitude);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(fallbackTimer);
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        clearTimeout(fallbackTimer);
        fetchWeather(DEFAULT_COORDS.latitude, DEFAULT_COORDS.longitude);
      },
      { timeout: 5000 }
    );

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimer);
    };
  }, []);

  return { weatherData, error };
}

export async function useGeolocationCords() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const successCallback = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const errorCallback = (error: GeolocationPositionError) => {
      setError(error.message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      setError("Geolocalización no está soportada en este navegador");
    }
  }, []);

  return { latitude: location.latitude, longitude: location.longitude, error };
}

export function useGoTo() {
  const router = useRouter();
  return (route: string) => {
    router.push(route);
  };
}

export function useMenuLi() {
  const [menuStatus, menuStatusSetter] = useRecoilState(menuAtom);
  const goto = useGoTo();
  return (route: string) => {
    goto(route);
    menuStatusSetter(!menuStatus);
  };
}

export function useLogoHook() {
  const goto = useGoTo();
  const menuStatusSetter = useSetRecoilState(menuAtom);
  const { data: session } = useSession();
  return () => {
    session ? goto("/home") : goto("/");
    menuStatusSetter(false);
  };
}

export function useCTA() {
  const goto = useGoTo();
  const { data: session } = useSession();
  return () => {
    if (session?.user) {
      goto("/home");
    } else {
      goto("/login");
    }
  };
}

export function useSignin() {
  return async () => {
    await signIn("google", {
      callbackUrl: `${process.env.NEXT_PUBLIC_ENV}/home`,
    });
  };
}

export function useLogOut() {
  return async () => {
    await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_ENV}/` });
  };
}

export function useCreateList() {
  const loaderSetter = useSetRecoilState(loaderAtom);
  return async function (list: any) {
    loaderSetter(true);
    const createdList = await createList(list);
    loaderSetter(false);
    return createdList;
  };
}

export function useGetUserList() {
  const loaderSetter = useSetRecoilState(loaderAtom);
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";

  return async () => {
    loaderSetter(true);
    const lists = await getUserLists(userEmail);
    loaderSetter(false);
    return lists;
  };
}

export function useMiniList() {
  const lastListIDSetter = useSetRecoilState(lastListID);
  const goto = useGoTo();
  return (id: string, route: string) => {
    lastListIDSetter(id);
    goto(route);
  };
}

export function useGetListData() {
  const loaderSetter = useSetRecoilState(loaderAtom);
  const params: any = useParams();

  return async () => {
    loaderSetter(true);
    const listData = await APIGetListData(params.listId);
    loaderSetter(false);
    return listData;
  };
}

export function useGetRecentList() {
  const listID = useRecoilValue(lastListID);
  return async () => {
    const listData = await APIGetListData(listID);
    return listData;
  };
}

export function useGetUpdateListItems() {
  const params: any = useParams();
  const router = useRouter();
  const loaderSetter = useSetRecoilState(loaderAtom);

  return async (itemsArr: any) => {
    loaderSetter(true);
    const updateList = await APIUpdateListItems(params.listId, itemsArr);
    loaderSetter(false);
    router.refresh();
    return updateList;
  };
}

export function useDeleteList() {
  const loaderSetter = useSetRecoilState(loaderAtom);
  const listID = useRecoilValue(lastListID);
  const goto = useGoTo();
  return async () => {
    loaderSetter(true);
    await APIDeleteList(listID);
    loaderSetter(false);
    goto("/home");
  };
}

export function useActiveTrip() {
  const { data: session } = useSession();
  const [activeTrip, setActiveTrip] = useRecoilState(activeTripAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = session?.user?.email;
    if (!email) { setLoading(false); return; }
    APIGetActiveTrip(email).then(({ data }) => {
      setActiveTrip(data ?? null);
      setLoading(false);
    });
  }, [session]);

  return { activeTrip, loading };
}

export function useCreateTrip() {
  const { data: session } = useSession();
  const setActiveTrip = useSetRecoilState(activeTripAtom);
  const setModal = useSetRecoilState(createTripModalAtom);
  const setLastCompleted = useSetRecoilState(lastCompletedTripAtom);
  const loaderSetter = useSetRecoilState(loaderAtom);

  return async (tripData: {
    origin: string;
    destination: string;
    bikeId: string;
    bikeName: string;
    estimatedKm?: number;
  }) => {
    const email = session?.user?.email || "";
    loaderSetter(true);
    const { data } = await APICreateTrip({ ...tripData, ownerEmail: email });
    loaderSetter(false);
    if (data) {
      setLastCompleted(null);
      setActiveTrip(data);
      setModal(false);
    }
  };
}

export function useEndTrip() {
  const [activeTrip, setActiveTrip] = useRecoilState(activeTripAtom);
  const setLastCompleted = useSetRecoilState(lastCompletedTripAtom);
  const loaderSetter = useSetRecoilState(loaderAtom);

  return async () => {
    if (!activeTrip?.id) return;
    loaderSetter(true);
    await APIEndTrip(activeTrip.id);
    loaderSetter(false);
    setLastCompleted({ ...activeTrip, status: "completed", endedAt: new Date().toISOString() });
    setActiveTrip(null);
  };
}
