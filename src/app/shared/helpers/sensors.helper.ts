import {
	Icon,
	IconType,
	MappedIcons,
	MappedSensors,
	Sensor,
	SensorFullState,
	SensorGroup,
	SensorState,
	SensorStatus,
} from '@entities/sensors.interfaces';

export class SensorsHelper {
	public static getSensorGroups(sensors: Sensor[], icons: MappedIcons): Set<SensorGroup> {
		const groups: Record<string, number[]> = sensors.reduce(
			(acc, sensor) => ({
				...acc,
				[sensor.group]: [...(acc[sensor.group] || []), sensor.id],
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
					icon: icons[IconType.Group][group],
				});
			});
		return sensorGroups;
	}

	public static mapSensors(sensors: Sensor[]): MappedSensors {
		return sensors?.reduce((acc, s) => ({...acc, [s.id]: s}), {});
	}

	public static updateSensors(oldData: MappedSensors, newData: Sensor[]): MappedSensors {
		if (!newData?.length) {
			return null;
		}

		oldData = {...oldData};

		newData?.forEach((sensor) => {
			oldData[sensor.id] = sensor;
		});
		return oldData;
	}

	public static getJsonState<T extends SensorFullState = SensorFullState>(sensor: Sensor): T {
		if (sensor.state.includes('}')) {
			return JSON.parse(sensor.state) as T;
		}
		return null;
	}

	public static isJSON(state: string): boolean {
		return state.includes('}');
	}

	public static mapIcons(icons: Icon[]): MappedIcons {
		if (!icons) {
			return null;
		}
		return icons.reduce((acc, item) => {
			if (!acc[item.type]) {
				acc[item.type] = {};
			}

			acc[item.type][item.key] = item.icon;
			return acc;
		}, {} as MappedIcons);
	}

	public static getSensorIcon(sensor: Sensor, icons: MappedIcons): Icon['icon'] {
		if (icons[IconType.Sensor][`${sensor.id}`]) {
			return icons[IconType.Sensor][`${sensor.id}`];
		}

		if (icons[IconType.Group][sensor.group]) {
			return icons[IconType.Group][sensor.group];
		}

		return icons[IconType.Default][IconType.Default];
	}

	public static getSensorState(state: string, isPending: boolean): SensorState {
		if (isPending) {
			return SensorState.Pending;
		}

		if (!state?.length) {
			return SensorState.Unknown;
		}

		state = state.toLowerCase();

		if (state === SensorState.On || state === SensorState.Off) {
			return state as SensorState;
		}

		return SensorState.Value;
	}

	public static expandState(sensor: Sensor): Sensor {
		const jsonState = SensorsHelper.getJsonState(sensor);
		const sensorState = SensorsHelper.getSensorState(jsonState?.state ?? sensor.state, sensor.pending);
		let sensorStatus;
		if (!sensor.normalState.length) {
			sensorStatus = SensorStatus.Default;
		} else if (sensor.state.toLowerCase() === 'err') {
			sensorStatus = SensorStatus.Error;
		} else if (sensorState === SensorState.Value) {
			sensorStatus = sensor.state === sensor.normalState ? SensorStatus.Normal : SensorStatus.Abnormal;
		} else {
			sensorStatus = sensorState === sensor.normalState ? SensorStatus.Normal : SensorStatus.Abnormal;
		}

		return {
			...sensor,
			sensorState,
			jsonState,
			sensorStatus,
		};
	}
}
