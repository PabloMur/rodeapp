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
import { activeTripAtom, createTripModalAtom } from "@/atoms";

interface Location {
  latitude: any;
  longitude: any;
}

interface GeolocationHook {
  weatherData: Location | null;
  error: string | null;
}

export function useGeolocation(): GeolocationHook {
  const [weatherData, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const weather = (await getWeather(latitude, longitude)) as any;
          console.log(weather);

          setLocation(weather);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocalización no está soportada en este navegador");
    }
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
  //Este hook es para iniciar sesion
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

//this hooks give us the data of a list in particular
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
  const loaderSetter = useSetRecoilState(loaderAtom);

  return async (itemsArr: any) => {
    loaderSetter(true);
    const updateList = await APIUpdateListItems(params.listId, itemsArr);
    loaderSetter(false);
    window.location.reload();
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
      setActiveTrip(data);
      setModal(false);
    }
  };
}

export function useEndTrip() {
  const [activeTrip, setActiveTrip] = useRecoilState(activeTripAtom);
  const loaderSetter = useSetRecoilState(loaderAtom);

  return async () => {
    if (!activeTrip?.id) return;
    loaderSetter(true);
    await APIEndTrip(activeTrip.id);
    loaderSetter(false);
    setActiveTrip(null);
  };
}
