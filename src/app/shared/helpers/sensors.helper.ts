import {
	Icon,
	IconType,
	MappedIcons,
	MappedSensors,
	Sensor,
	SensorFullState,
	SensorGroup,
	SensorState,
} from '@entities/sensors.interfaces';

export class SensorsHelper {
	public static getSensorGroups(sensors: Sensor[], icons: MappedIcons): Set<SensorGroup> {
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
					icon: icons[IconType.Group][group],
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

	public static getFullState<T extends SensorFullState = SensorFullState>(sensor: Sensor): T {
		if (sensor.state.includes('}')) {
			return JSON.parse(sensor.state) as T;
		}
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		return {state: sensor.state} as T;
	}

	public static getState(sensor: Sensor, getDefaultState = false): SensorState | string {
		if (!sensor) {
			return null;
		}

		let state = getDefaultState ? sensor.normal_state : SensorsHelper.getFullState(sensor).state;

		if (!state?.length) {
			return SensorState.Unknown;
		}

		state = state.toLocaleLowerCase();

		if (state === SensorState.On || state === SensorState.Off) {
			return state as SensorState;
		}

		if (getDefaultState) {
			return state;
		}

		if (sensor.pending) {
			return SensorState.Pending;
		}

		return state;
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
		if (icons[IconType.Sensor][`${sensor.sensor_id}`]) {
			return icons[IconType.Sensor][`${sensor.sensor_id}`];
		}

		if (icons[IconType.Group][sensor.group]) {
			return icons[IconType.Group][sensor.group];
		}

		return icons[IconType.Default][IconType.Default];
	}
}
