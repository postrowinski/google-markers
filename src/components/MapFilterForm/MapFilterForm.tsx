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
      <div className="grid gap-6 m-3 ml-6 mr-6  md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Prędność minimalna
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name={"speed" as keyof MapFilterDTO}
            type="number"
            onChange={formik.handleChange}
            value={formik.values.speed}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Status
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Filtruj
        </button>
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
          onClick={() => formik.resetForm()}
        >
          Wyszyść filtr
        </button>
      </div>
    </form>
  );
};
