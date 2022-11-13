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
    <form onSubmit={formik.handleSubmit}>
      <label>
        Klucz Api do mapy googla
        <input
          name={"key" as keyof MapApiKeyDTO}
          onChange={formik.handleChange}
          value={formik.values.key}
        />
      </label>
      <button type="submit">Dodaj klucz do localStorage</button>
    </form>
  );
};
