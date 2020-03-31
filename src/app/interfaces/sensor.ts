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
export interface Sensors {
  [index: number]: Sensor[];
}
export interface Groups {
  [index: number]: Array<number>;
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

export enum SwOnOff {on, off}

export enum AcSwing {auto, off, top, middle, bottom}

export enum AcFan {auto, s1, s2, s3}

export enum AcMode {auto, cool, hot, dry, fan}

export interface AcState {
  change_time: string;
  temperature: number;
  swing: AcSwing;
  mode: AcMode;
  turbo: SwOnOff;
  fan: AcFan;
  state: SwOnOff;
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
  extraState: any;

  constructor(input?: SensorData) {
    if (input) {
      for (const key of Object.keys(input)) {
        this[key] = input[key];
      }
      this.id = this.sensor_id;
      if (this.state.indexOf('{') === 0) { // JSON
        this.extraState = JSON.parse(this.state);
        if (this.extraState.state) {
          this.state = this.extraState.state.toUpperCase();
        }
      }
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
