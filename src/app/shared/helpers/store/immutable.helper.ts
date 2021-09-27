import {AnyObject} from '@shared/helpers/store/actions.helper';

function innerSet<T, S>(field: string, obj: T, value: S): T {
	return Object.assign({}, obj, {[field]: value}) as T;
}

export function set<S, T>(path: string | string[], value: S): T;
export function set<S, T>(path: string | string[], value: S, obj: T): T;

/**
 * function for immutable set new value in object
 *
 * @param path path in object
 * @param value new value
 * @param obj object for set new value
 *
 * @example
 * set('a', 1, obj)
 */
export function set<S, T extends AnyObject>(path: string | string[], value: S, obj?: T): T | ((a: T) => T) {
	if (!path.length) {
		return obj;
	}
	if (!obj) {
		return (flowObj: T) => set(path, value, flowObj);
	}
	if (Array.isArray(path)) {
		const [first, ...next] = path;

		if (next.length === 1) {
			return innerSet(first, obj, set(next[0], value, obj[first]));
		}

		return innerSet(first, obj, {[first]: set(next, value, obj[first])});
	}
	return Object.assign({}, obj, {[path]: value}) as T;
}

/**
 * function for run chain of functions
 *
 * @param obj object for  set new value
 *
 * @example
 *
 * flow(state)(
 *    set('a', 1),
 *    set('b', 2)
 * );
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function flow<T, S extends Function>(obj: T): (...args: S[]) => T {
	return (...args: S[]) =>
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		args.reduce((acc, fn) => fn(acc), obj);
}
