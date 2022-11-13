import { useFormik, Formik } from "formik";
import React from "react";
import { MapFilterDTO, MarkerFiltered, MarkerStatus } from "../../types/types";

interface Props {
  allMarkers: MarkerFiltered[];
  setFilteredMarkers: (markers: MarkerFiltered[]) => void;
}

const statusOptions: MarkerStatus[] = ["", "Device Offline", "No Alarm"];

export const MapFilterForm: React.FC<Props> = ({
  allMarkers,
  setFilteredMarkers,
}) => {
  const formik = useFormik<MapFilterDTO>({
    initialValues: {
      speed: "",
      status: "",
    },
    enableReinitialize: true,
    onSubmit,
  });

  function onSubmit(values: MapFilterDTO) {
    const result: MarkerFiltered[] = allMarkers.map((marker) => {
      let visible = true;
      if (values.status !== "" && visible) {
        visible = marker.last_status === values.status;
      }
      if (values.speed !== "" && visible) {
        visible = marker.last_speed >= values.speed;
      }
      return {
        ...marker,
        visible,
      };
    });
    setFilteredMarkers(result);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        Prędność minimalna
        <input
          name={"speed" as keyof MapFilterDTO}
          type="number"
          onChange={formik.handleChange}
          value={formik.values.speed}
        />
      </label>
      <label>
        Status
        <select
          name={"status" as keyof MapFilterDTO}
          value={formik.values.status}
          onChange={formik.handleChange}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Filtruj</button>
      <button type="button" onClick={() => formik.resetForm()}>
        Wyszyść filtr
      </button>
    </form>
  );
};
