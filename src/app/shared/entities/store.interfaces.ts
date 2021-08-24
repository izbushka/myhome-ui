export enum StoreModules {
	Router = 'router',
	Sensors = 'sensors',
	Common = 'common',
	Auth = 'auth',
	DbTables = 'dbTables',
}

/** Type that represents possible states of API response status */
export type LoadingStatus =
	| {loading: false; loaded: false; error: null}
	| {loading: true; loaded: false; error: null}
	| {loading: false; loaded: true; error: null}
	| {loading: true; loaded: true; error: null}
	| {loading: false; loaded: false; error: unknown};

/**
 * Configurations of various types of LoadingStatus
 */
interface Statuses {
	default: LoadingStatus;
	loading: LoadingStatus;
	updating: LoadingStatus;
	loaded: LoadingStatus;
	error: (error: unknown) => LoadingStatus;
}

/** Constant contained configurations of various types of LoadingStatus **/
export const status: Statuses = {
	default: {loading: false, loaded: false, error: null},
	loading: {loading: true, loaded: false, error: null},
	updating: {loading: true, loaded: true, error: null},
	loaded: {loading: false, loaded: true, error: null},
	error: (error: unknown) => ({loading: false, loaded: false, error: error || 'Something went wrong'}),
};
