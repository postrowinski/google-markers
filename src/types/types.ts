export type MarkerStatus = "Device Offline" | "No Alarm" | "";

export interface MarkerDTO {
  id: number;
  sim_number: number;
  imei: number;
  last_longitude: number;
  last_latitude: number;
  last_altitude: number;
  last_speed: number;
  last_status: MarkerStatus;
  last_track_time: string;
  last_heartbeat: number;
}

export interface MarkerFiltered extends MarkerDTO {
  visible: boolean;
}

export interface MapFilterDTO {
  status: MarkerStatus;
  speed: number | string;
}

export interface MapApiKeyDTO {
  key: string;
}
