import {Sensor, SensorGroup} from '@entities/sensors.interfaces';

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
}
