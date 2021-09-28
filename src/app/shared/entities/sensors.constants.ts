//TODO: move to env
import {Highcharts} from 'highcharts/modules/data';
import {SensorGroup, SensorGroups} from '@entities/sensors.interfaces';

export const API_BASE_URL = 'https://rpi.xvv.be/sensors';
export const AUTH_BASE_URL = 'https://auth.rpi.xvv.be/auth';
export const GOOGLE_AUTH_URL = AUTH_BASE_URL + '/google/login';

export const SENSORS_CHART_OPTIONS: Highcharts.Options = {
	chart: {
		zoomType: 'x',
		backgroundColor: 'transparent',
	},
	title: {
		text: ' ',
	},
	xAxis: {
		type: 'datetime',
	},
	yAxis: {
		gridLineColor: '#393939',
	},
	credits: {
		enabled: false,
	},
	legend: {
		enabled: false,
	},
	time: {
		useUTC: false,
	},
	plotOptions: {
		area: {
			marker: {
				radius: 2,
			},
			lineWidth: 1,
			states: {
				hover: {
					lineWidth: 1,
				},
			},
			threshold: null,
		},
	},
};

export const SENSORS_FAVORITES_GROUP: SensorGroup = {
	name: SensorGroups.Favorites,
	members: [],
	icon: 'star_border',
};