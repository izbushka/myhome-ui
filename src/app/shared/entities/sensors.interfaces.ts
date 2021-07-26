export interface SensorsApiResponse {
	timestamp: number;
	sensors: Sensor[];
}

export interface Sensor {
	sensor_id: number;
	pending: number;
	group: string;
	state: string;
	sensor: string;
	name: string;
	type: string;
	last_change?: string;
	normal_state?: string;
	logs?: SensorLog[];
}

export interface SensorLog {
	state: string;
	change_time: string;
}

export type MappedSensors = Record<Sensor['sensor_id'], Sensor>;

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
