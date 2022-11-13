import React from "react";
import { MapApiKeyForm } from "./components/MapApiKeyForm/MapApiKeyForm";
import { MapView } from "./components/MapVIew/MapView";
import { localStorageApiKeyName } from "./services/Api/MapService";

const apiKey = localStorage.getItem(localStorageApiKeyName);

const App: React.FC = () => {
  return <>{apiKey ? <MapView /> : <MapApiKeyForm />}</>;
};

export default App;
