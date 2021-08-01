import {Pipe, PipeTransform} from '@angular/core';

interface Rule {
	singular: string;
	plural: string;
}

/**
 * Created by mirage on 24.02.18.
 */
/**
 * Take an RFC 3339 or ISO 8601 date and returns
 * the date in human readable form.
 *
 * Will return undefined if lacks browser support
 * or it cannot parse the date.
 *
 * @param  {string} time
 * @return {string|undefined}
 * @license MIT
 * @author Sam Clarke <sam@samclarke.com>
 */
function timeToWords(time: string): string {
	// const date = new Date(time);
	// time = (date.getTime() / 1000).toString();
	// return 'AAA' + time;
	const postfixes = {
		'<': ' ago',
		'>': ' from now',
	};

	const lang: Record<number, Rule> = {
		1000: {
			singular: 'a few moments',
			plural: 'a few moments',
		},
		60000: {
			singular: 'about a minute',
			plural: '# minutes',
		},
		3600000: {
			singular: 'about an hour',
			plural: '# hours',
		},
		86400000: {
			singular: 'a day',
			plural: '# days',
		},
		31540000000: {
			singular: 'a year',
			plural: '# years',
		},
	};

	const timeSpans = Object.keys(lang).map((key) => +key);
	const parsedTime = Date.parse(time.replace(/-00:?00$/, ''));

	if (parsedTime && Date.now) {
		const timeAgo = parsedTime - Date.now();
		const diff = Math.abs(timeAgo);
		const postfix = postfixes[timeAgo < 0 ? '<' : '>'];
		let timespan = timeSpans[0];

		for (let i = 1; i < timeSpans.length; i++) {
			if (diff > timeSpans[i]) {
				timespan = timeSpans[i];
			}
		}

		const n = Math.round(diff / timespan);
		return `${lang[timespan][n > 1 ? 'plural' : 'singular'].replace('#', `${n}`)}${postfix}`;
	}
	return 'date parse error';
}

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({name: 'timeAgo'})
export class TimeAgo implements PipeTransform {
	transform(value: string): string {
		return timeToWords(value);
	}
}
