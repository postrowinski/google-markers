import React, { useEffect } from "react";
import { Map } from "../../components/Map/Map";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MarkerFiltered } from "../../types/types";
import { localStorageApiKeyName } from "../../services/Api/MapService";

interface Props {
  markers: MarkerFiltered[];
}

const apiKey = localStorage.getItem(localStorageApiKeyName);

export const MapWrapper: React.FC<Props> = ({ markers }) => {
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const firstMarker = markers[0];
    if (firstMarker) {
      setCenter({
        lat: firstMarker.last_latitude,
        lng: firstMarker.last_longitude,
      });
    }
  }, [markers]);

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return (
    <Wrapper apiKey={apiKey ?? ""} render={render}>
      <Map
        center={center}
        zoom={6}
        locations={markers}
        style={{ flexGrow: "1", height: "100%" }}
      />
    </Wrapper>
  );
};
