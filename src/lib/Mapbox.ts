import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// Default center: Buenos Aires
const DEFAULT_CENTER: [number, number] = [-58.3816, -34.6037];

const getGeolocation = (): Promise<{ latitude: number; longitude: number }> =>
  new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ latitude: DEFAULT_CENTER[1], longitude: DEFAULT_CENTER[0] });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }),
      () => resolve({ latitude: DEFAULT_CENTER[1], longitude: DEFAULT_CENTER[0] })
    );
  });

export const createMap = async (mapContainer: any) => {
  try {
    const { latitude, longitude } = await getGeolocation();

    const map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [longitude, latitude],
      zoom: 14,
      projection: "globe" as any,
    });

    return map;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const initGeocoder = async () => {
  try {
    return new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
  } catch (error) {
    console.error(error);
  }
};

export const initGeolocate = async () => {
  try {
    return new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    }) as any;
  } catch (error) {
    console.error(error);
  }
};

export const putMarkers = async (map: any, pets: any) => {
  try {
    // const Popup = (petName) => <div className="popup">{petName}</div>;

    // const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    for (const petItem in pets.response) {
      const { image, fullname, zone, id, ownerEmail } = pets.response[petItem];
      const { lat, lng } = pets.response[petItem]._geoloc;

      new mapboxgl.Marker({
        color: "#FF0000",
      })
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 10 }).setHTML(
            `<custom-pet-card owner-email="${ownerEmail}" pet-id="${id}" profile-image="${image}" pet-name="${fullname}" pet-zone="${zone}"></custom-pet-card>`
          )
        )
        .addTo(map);

      // const popupNode = document.createElement("div");
      // ReactDOM.render(<Popup petName={fullname} />, popupNode);
      // popUpRef.current
      //   .setLngLat([lng, lat])
      //   .setDOMContent(popupNode)
      //   .addTo(map);
      // return <></>;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAndSetPetsinToMap = async (map: any, prov: any) => {
  try {
    const { lat, lng } = prov;
    //const pets = await APIgetPetsAround(lat, lng);
    //await putMarkers(map, pets);
    //return pets;
  } catch (error) {
    console.error(error);
  }
};

export const petLocationCoordSetter = async (map: any, pets: any) => {
  try {
    for (const petItem in pets.response) {
      const { image, fullname, zone, id, ownerEmail } = pets.response[petItem];
      const { lat, lng } = pets.response[petItem]._geoloc;

      new mapboxgl.Marker({
        color: "#FF0000",
      })
        .setLngLat([lng, lat])
        .addTo(map);
    }
  } catch (error) {
    console.error(error);
  }
};
