export interface SensorsApiResponse {
	timestamp: number;
	sensors: Sensor[];
}

export type IconsApiResponse = Icon[];

export interface Icon {
	type: IconType;
	key: string | number;
	icon: string;
}

export interface Sensor {
	sensor_id: number;
	pending: number;
	group: string;
	state: string;
	sensor: string;
	name: string;
	type: string;
	icon: Icon['icon'];
	readonly: boolean;
	last_change?: string;
	normal_state?: string;
	logs?: SensorLog[];
}

export interface SensorLog {
	state: string;
	change_time: string;
}

export type MappedSensors = Record<Sensor['sensor_id'], Sensor>;
export type MappedIcons = Record<Icon['type'], Record<Icon['key'], Icon['icon']>>;

export interface SensorGroup {
	name: string;
	members: number[];
	icon?: string;
}

export enum SensorState {
	On = 'on',
	Off = 'off',
	Pending = 'pending',
	Unknown = 'unknown',
}

export enum IconType {
	Group = 'group',
	Sensor = 'sensor',
	Default = 'default',
}

export enum SwOnOff {
	On = 'on',
	Off = 'off',
}

export enum AcSwing {
	Auto,
	Off,
	Top,
	Middle,
	Bottom,
}

export enum AcFan {
	Auto,
	S1,
	S2,
	S3,
}

export enum AcMode {
	Auto,
	Cool,
	Hot,
	Dry,
	Fan,
}

export interface AcState {
	change_time: string;
	temperature: number;
	swing: AcSwing;
	mode: AcMode;
	turbo: SwOnOff;
	fan: AcFan;
	state: SwOnOff;
}
