import React from "react";
import { useFormik } from "formik";
import { MapApiKeyDTO } from "../../types/types";
import { localStorageApiKeyName } from "../../services/Api/MapService";

export const MapApiKeyForm: React.FC = () => {
  const formik = useFormik<MapApiKeyDTO>({
    initialValues: {
      key: "",
    },
    onSubmit,
  });

  function onSubmit(values: MapApiKeyDTO) {
    localStorage.setItem(localStorageApiKeyName, values.key);
    window.location.reload();
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Klucz Api do mapy googla
          </label>
          <input
            className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 w-80 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name={"key" as keyof MapApiKeyDTO}
            onChange={formik.handleChange}
            value={formik.values.key}
          />

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            Dodaj klucz do localStorage
          </button>
        </div>
      </form>
    </div>
  );
};
