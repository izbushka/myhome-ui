export interface DbSensors {
  sensor_id: number;
  type: string;
  sensor: string;
  name: string;
  enabled: 'YES' | 'NO';
  group: string;
  normal_state: string;
}
export interface DbActions {
  action_id: number;
  name: string;
  command: string;
  enabled: 'YES' | 'NO';
}
export interface DbSensorsActions {
  sensor_id: number;
  action_id: number;
  delay: number;
  runs: number;
  repeat_delay: number;
  state: string;
  run_order: number;
}
