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
      }
      this.id = this.sensor_id;
    }
  }
  isMutable(): boolean {
    return ['light-switch', 'power-switch'].indexOf(this.group) !== -1;
  }
  isOn(): boolean {
    return this.state === 'ON' || this.state === 'PON';
  }
  isWarn(): boolean {
    return (this.normal_state && this.state !== this.normal_state) || this.state === 'ERR';
  }
}

export class SensorIcon {
  icons = {
    lock: 'lock',
    'light-switch': 'lightbulb_outline',
    'power-switch': 'power',
    'light-btn': 'wb_incandescent',
    'air-conditioner': 'ac_unit',
    'air-purifier': 'toys',
    alarm: 'security',
    motion: 'remove_red_eye',
    sensors: 'filter_tilt_shift',

    default: 'policy'
  };
  get(group: string): string {
    return (this.icons[group]) ? this.icons[group] : this.icons.default;
  }
}
