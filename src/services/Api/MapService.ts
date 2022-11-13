import React, { useRef, useEffect } from "react";
import { MarkerDTO, MarkerStatus } from "./../../types/types";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";

const iconBase = "http://maps.google.com/mapfiles/ms/icons/";

const deepCompareEqualsForMaps = createCustomEqual(
  //@ts-ignore
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    //@ts-ignore
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export function setContentWindowInfo(marker: MarkerDTO): string {
  return `
    <div>
      <ul>
        ${Object.keys(marker).map(
          (key: string) => `<li>${key}: ${marker[key as keyof MarkerDTO]}</li>`
        )}
      </ul>
    </div>
  `;
}

export function setMarkerIcon(status: MarkerStatus) {
  switch (status) {
    case "No Alarm": {
      return iconBase + "green-dot.png";
    }
    default: {
      return iconBase + "yellow-dot.png";
    }
  }
}

export const localStorageApiKeyName = "google-maps-api-key";
