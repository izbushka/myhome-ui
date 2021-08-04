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

export interface SensorChartPoint {
	sensor_id: string;
	time: string;
	date: string;
	value: number;
}

export type MappedSensors = Record<Sensor['sensor_id'], Sensor>;
export type MappedIcons = Record<Icon['type'], Record<Icon['key'], Icon['icon']>>;

export interface SensorGroup {
	name: string;
	members: number[];
	icon?: string;
}

export interface SensorFullState extends Record<string, unknown> {
	state: string;
}

export enum SensorState {
	On = 'on',
	Off = 'off',
	Pending = 'pending',
	Unknown = 'unknown',
}

export enum SensorClasses {
	On = 'state-on',
	Off = 'state-off',
	Pending = 'state-pending',
	Unknown = 'state-unknown',
	Normal = 'state-normal',
	Good = 'state-good',
	Error = 'state-error',
}

export enum IconType {
	Group = 'group',
	Sensor = 'sensor',
	Default = 'default',
}

export enum AcSwing {
	Auto = 'auto',
	Off = 'off',
	Top = 'top',
	Middle = 'middle',
	Bottom = 'bottom',
}

export enum AcFan {
	Auto = 'auto',
	S1 = 's1',
	S2 = 's2',
	S3 = 's3',
}

export enum AcMode {
	Auto = 'auto',
	Cool = 'cool',
	Hot = 'hot',
	Dry = 'dry',
	Fan = 'fan',
}

export interface AcState extends SensorFullState {
	change_time: string;
	temperature: number;
	swing: AcSwing;
	mode: AcMode;
	turbo: SensorState;
	fan: AcFan;
	state: SensorState;
}
