import {MappedSensors, Sensor, SensorGroup, SensorState} from '@entities/sensors.interfaces';

export class SensorsHelper {
	public static getSensorGroups(sensors: Sensor[]): Set<SensorGroup> {
		const groups: Record<string, number[]> = sensors.reduce(
			(acc, sensor) => ({
				...acc,
				[sensor.group]: [...(acc[sensor.group] || []), sensor.sensor_id],
			}),
			{} as Record<string, number[]>
		);
		const sensorGroups = new Set<SensorGroup>();
		Object.keys(groups)
			.sort()
			.forEach((group) => {
				sensorGroups.add({
					name: group,
					members: groups[group],
				});
			});
		return sensorGroups;
	}

	public static mapSensors(sensors: Sensor[]): MappedSensors {
		return sensors?.reduce((acc, s) => ({...acc, [s.sensor_id]: s}), {});
	}

	public static updateSensors(oldData: MappedSensors, newData: Sensor[]): MappedSensors {
		if (!newData?.length) {
			return null;
		}

		oldData = {...oldData};

		newData?.forEach((sensor) => {
			oldData[sensor.sensor_id] = sensor;
		});
		return oldData;
	}

	public static getState(sensor: Sensor, getDefaultState = false): SensorState {
		if (!sensor) {
			return null;
		}

		let state = getDefaultState ? sensor.normal_state : sensor.state;
		if (!state) {
			return SensorState.Unknown;
		}
		if (state.includes('}')) {
			state = (JSON.parse(state) as {state: string}).state;
		}

		state = state.toLocaleLowerCase();

		if (state === SensorState.On || state === SensorState.Off) {
			return state as SensorState;
		}
		// TODO: check data when sensor.pending: what sensor.state
		return SensorState.Pending;
	}
}
