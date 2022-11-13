import React, { useEffect, useRef, useState } from "react";
import {
  setContentWindowInfo,
  setMarkerIcon,
  useDeepCompareEffectForMaps,
} from "../../services/Api/MapService";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { MarkerFiltered } from "../../types/types";

interface MapProps extends google.maps.MapOptions {
  style?: React.CSSProperties;
  locations: MarkerFiltered[];
}

export const Map: React.FC<MapProps> = ({ style, locations, ...options }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  const [markerClusterer, setMarkerClusterer] = useState<MarkerClusterer>();

  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  const markers = locations.map((location) => {
    const position: google.maps.LatLngLiteral = {
      lat: location.last_latitude,
      lng: location.last_longitude,
    };

    const marker = new google.maps.Marker({
      position,
      visible: location.visible,
      icon: setMarkerIcon(location.last_status),
    });

    marker.addListener("click", () => {
      infoWindow.setContent(setContentWindowInfo(location));
      infoWindow.open(map, marker);
    });

    return marker;
  });

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useEffect(() => {
    if (markerClusterer) {
      markerClusterer.clearMarkers();
      markerClusterer.addMarkers(markers);
    }
  }, [locations, markerClusterer, markers]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
      if (!markerClusterer) {
        setMarkerClusterer(new MarkerClusterer({ map }));
      }
    }
  }, [map, options]);

  return <div ref={ref} style={style} />;
};
