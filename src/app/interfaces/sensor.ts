export interface Sensor {
  sensor_id: number;
  pending: number;
  last_change: string;
  group: string;
  state: string;
  sensor: string;
  normal_state: string;
  name: string;
  type: string;
  logs?: [{state: string, change_time: string}];
}

export interface SensorGroups {
  [index: string]: Sensor[];
}
