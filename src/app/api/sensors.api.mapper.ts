import {MappedIcons, SensorsApiResponse} from '@entities/sensors.interfaces';
import {SensorsHelper} from '@shared/helpers/sensors.helper';

export class SensorsApiMapper {
	public static mapSensors(data: SensorsApiResponse, icons: MappedIcons): SensorsApiResponse {
		return {
			timestamp: data.timestamp,
			sensors: data.sensors.map((sensor) => ({...sensor, icon: SensorsHelper.getSensorIcon(sensor, icons)})),
		};
	}
}
