export interface SensorsResponse {
	timestamp: number;
	sensors: Sensor[];
}

export interface SensorsApiResponse {
	timestamp: number;
	sensors: SensorApiData[];
}

export type IconsApiResponse = Icon[];

export interface Icon {
	type: IconType;
	key: string | number;
	icon: string;
}

export interface Sensor {
	id: number;
	pending: boolean;
	group: string;
	state: string;
	sensor: string;
	name: string;
	type: string;
	readonly: boolean;
	lastChange: string;
	normalState: string;
	logs?: SensorLog[];
	icon: Icon['icon'];
	sensorState: SensorState;
	jsonState: SensorFullState;
	sensorStatus: SensorStatus;
}

export interface SensorApiData {
	sensor_id: number;
	pending: boolean;
	group: string;
	state: string;
	sensor: string;
	name: string;
	type: string;
	readonly: boolean;
	last_change: string;
	normal_state: string;
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

export type MappedSensors = Record<Sensor['id'], Sensor>;
export type MappedIcons = Record<Icon['type'], Record<Icon['key'], Icon['icon']>>;

export interface SensorGroup {
	name: string;
	members: number[];
	icon?: string;
}

export interface SensorFullState extends Record<string, unknown> {
	state: string;
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

export enum SensorState {
	On = 'on',
	Off = 'off',
	Pending = 'pending',
	Value = 'value',
	Unknown = 'unknown',
}

export enum SensorStatus {
	Normal = 'normal',
	Abnormal = 'abnormal',
	Error = 'error',
	Default = 'default',
}

export enum SensorClasses {
	On = 'state-on',
	Off = 'state-off',
	Pending = 'state-pending',
	Unknown = 'state-unknown',
	Normal = 'state-normal',
	Abnormal = 'state-abnormal',
	Default = 'state-default',
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

export enum SensorGroups {
	Favorites = 'favorites',
	AC = 'air-conditioner',
	Light = 'light-switch',
}
