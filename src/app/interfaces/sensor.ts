export interface SensorData {
  sensor_id?: number;
  last_change?: string;
  normal_state?: string;
  pending: number;
  group: string;
  state: string;
  sensor: string;
  name: string;
  type: string;
  logs?: SensorLog[];
}

export interface SensorGroups {
  [index: string]: Sensor[];
}

export interface SensorGraphPoint {
  sensor_id: string;
  time: string;
  date: string;
  value: number;
}

export interface SensorLog {
  state: string;
  change_time: string;
}

export class Sensor implements SensorData {
  id: number;
  pending: number;
  group: string;
  state: string;
  sensor: string;
  name: string;
  type: string;
  last_change: string;
  normal_state: string;
  sensor_id: number;
  logs?: [{ state: string, change_time: string }];
  constructor(input?: SensorData) {
    if (input) {
      for (const key of Object.keys(input)) {
        this[key] = input[key];
        // if (this.hasOwnProperty(key)) {
        //   this[key] = input[key];
        //   console.log(key);
        // }
      }
      this.id = this.sensor_id;
    }
  }
  isMutable(): boolean {
    return this.group === 'light-switch';
  }
  isOn(): boolean {
    return this.state === 'ON' || this.state === 'PON';
  }
  isWarn(): boolean {
    return this.normal_state && this.state !== this.normal_state;
  }
}
