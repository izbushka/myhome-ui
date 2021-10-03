import {MappedIcons, Sensor, SensorsApiResponse, SensorsResponse} from '@entities/sensors.interfaces';
import {SensorsHelper} from '@shared/helpers/sensors.helper';

export class SensorsApiMapper {
	public static mapSensors(data: SensorsApiResponse, icons: MappedIcons): SensorsResponse {
		return {
			timestamp: data.timestamp,
			sensors: data.sensors
				.map((item) => {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					const {last_change, normal_state, sensor_id, ...rest} = item;
					const sensor: Sensor = {
						...rest,
						id: sensor_id,
						lastChange: last_change,
						normalState: normal_state.toLowerCase(),
						state: item.state.toLowerCase(),
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
				})
				.sort((a, b) => a.name.localeCompare(b.name)),
		};
	}
}
