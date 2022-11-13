import React, { useEffect, useState } from "react";
import { apiService } from "../../services/Api/ApiService";
import { MarkerDTO, MarkerFiltered } from "../../types/types";
import { MapWrapper } from "../../components/MapWrapper/MapWrapper";
import { MapFilterForm } from "../../components/MapFilterForm/MapFilterForm";

const url = "https://mocki.io/v1/384d1f5c-3747-4735-b9fc-3cccdb51138f";

export const MapView: React.FC = () => {
  const [allMarkers, setAllMarkers] = useState<MarkerFiltered[]>([]);

  useEffect(() => {
    apiService.getRequest<MarkerDTO[]>(url).then((res) => {
      const markers: MarkerFiltered[] = res.map((marker) => ({
        ...marker,
        visible: true,
      }));
      setAllMarkers(markers);
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <MapFilterForm
        allMarkers={allMarkers}
        setFilteredMarkers={setAllMarkers}
      />
      <MapWrapper markers={allMarkers} />
    </div>
  );
};
