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
