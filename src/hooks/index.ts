import { useRouter } from "next/navigation";
import { menuAtom } from "@/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getWeather } from "@/lib/APICalls";

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
  return () => {
    goto("/login");
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

// export const useGetWeather = () => {
//   const { location } = useGeolocation();
//   return async () => {
//     const weather = await APIgetWeather(
//       location?.latitude,
//       location?.longitude
//     );
//     return weather;
//   };
// };
