import {MappedIcons, Sensor, SensorsApiResponse, SensorsResponse} from '@entities/sensors.interfaces';
import {SensorsHelper} from '@shared/helpers/sensors.helper';

export class SensorsApiMapper {
	public static mapSensors(data: SensorsApiResponse, icons: MappedIcons): SensorsResponse {
		return {
			timestamp: data.timestamp,
			sensors: data.sensors.map((item) => {
				const sensor: Sensor = {
					...item,
					id: item.sensor_id,
					lastChange: item.last_change,
					normalState: item.normal_state,
					sensorState: null,
					jsonState: null,
					sensorStatus: null,
					icon: null,
				};
				sensor.icon = SensorsHelper.getSensorIcon(sensor, icons);
				return {
					...sensor,
					icon: SensorsHelper.getSensorIcon(sensor, icons),
					...SensorsHelper.expandState(sensor),
				};
			}).sort((a, b) => a.name.localeCompare(b.name)),
		};
	}
}
