export interface GeneralTableData extends Record<string, string | number> {
	sensor_id?: number;
	action_id?: number;
}

export type DbTablesData = Partial<Record<DbTables, GeneralTableData[]>>;

export interface TableEditorPayload {
	data: GeneralTableData;
	name: DbTables;
}

export enum DbTables {
	SensorsActionsCombined = 'Sensor Actions',
	Sensors = 'sensors',
	Actions = 'actions',
	SensorsActions = 'sensors_actions',
	Commands = 'commands',
	Icons = 'icons',
	SmsLog = 'sms_log',
	StatesLog = 'states_log',
}

export enum TableSearchBy {
	Unset = 'All fields',
	ActionId = 'Action ID',
	SensorId = 'Sensor ID',
}

/* eslint-disable @typescript-eslint/naming-convention */

export enum ColumnsOrder {
	unknown,
	rowid,
	sensor_id,
	action_id,
	cmd_id,
	name,
	group,
	key,
	type,
	icon,
	state,
	command,
	cmd,
	delay,
	runs,
	repeat_delay,
	run_order,
	interval,
	params,
	normal_state,
	enabled,
	date,
	sender,
	text,
	updated,
}

/* eslint-enable */
