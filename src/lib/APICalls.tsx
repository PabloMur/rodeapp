import axios, { AxiosResponse } from "axios";

interface ApiResponse<T> {
  data: T | null;
  error?: string;
}

export const getWeather = async (
  lat: number,
  lng: number
): Promise<ApiResponse<any>> => {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat}%2C${lng}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "604c4a73bcmsh15c5083584728f9p1678acjsn3f28db565705",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response: AxiosResponse<any> = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error(
      "Error en la llamada API para obtener datos del clima:",
      error
    );
    return { data: null, error: "Error al obtener datos del clima" };
  }
};

export const createList = async ({
  name,
  creatorEmail,
  category,
  items,
}: any): Promise<ApiResponse<string>> => {
  try {
    const response: AxiosResponse<string> = await axios.post("/api/list", {
      name,
      creatorEmail,
      category,
      items,
    });

    return { data: response.data };
  } catch (error) {
    console.error("Error en la llamada API para crear la lista:", error);
    return { data: null, error: "Error al crear la lista" };
  }
};

export const getUserLists = async (email: string): Promise<any> => {
  try {
    const response = await axios.get(`/api/list?email=${email}`);
    return { data: response.data };
  } catch (error) {
    console.error("Error en la obtencion de las listas creadas por el usuario");
    return {
      data: null,
      error: "Error en la obtencion de las listas del usuario",
    };
  }
};

export const APIGetListData = async (id: string) => {
  try {
    const response = await axios.get(`/api/list/${id}`);
    return { data: response.data };
  } catch (error) {
    console.error("Error en la obtencion de la informacion de la lista");
    return {
      data: null,
      error: "Error en la obtencion de la informacion de la lista",
    };
  }
};

export const APIUpdateListItems = async (id: string, itemsArr: any) => {
  try {
    console.log(id + " soy el id de la lista");

    const response = await axios.put(`/api/list/${id}`, {
      itemsArr,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const APIGetActiveTrip = async (email: string) => {
  try {
    const response = await axios.get(`/api/trip?email=${email}`);
    return { data: response.data.trip };
  } catch {
    return { data: null, error: "Error al obtener el viaje activo" };
  }
};

export const APICreateTrip = async (tripData: any) => {
  try {
    const response = await axios.post("/api/trip", tripData);
    return { data: response.data.trip };
  } catch {
    return { data: null, error: "Error al crear el viaje" };
  }
};

export const APIEndTrip = async (id: string) => {
  try {
    const response = await axios.put(`/api/trip/${id}`);
    return { data: response.data };
  } catch {
    return { data: null, error: "Error al terminar el viaje" };
  }
};

export const APIDeleteList = async (id: string) => {
  try {
    const response = await axios.delete(`/api/list/${id}`);
    return { data: response.data };
  } catch (error) {
    console.error("Error en la eliminacion de la lista");
    return {
      data: null,
      error: "Error en la obtencion de la informacion de la lista",
    };
  }
};
