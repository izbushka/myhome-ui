type SetResponse<T> = T | undefined | ((a: T) => T);

export function set<Value, State>(path: string | string[], value: Value): State;
export function set<Value, State>(path: string | string[], value: Value, obj: State): State;

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
export function set<Value, State>(path: string | string[], value: Value, obj?: State): SetResponse<State> {
	if (!path || !path.length) {
		return obj;
	}
	if (!obj) {
		return (flowObj: State) => set(path, value, flowObj);
	}
	if (Array.isArray(path)) {
		const [first, ...next] = path;
		/* eslint-disable-next-line */
		// @ts-ignore
		return set(next, value, obj[first]) as SetResponse<State>;
	}
	return Object.assign({}, obj, {[path]: value}) as State;
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
export function flow<T, S extends (a: T) => T>(obj: T): (...args: S[]) => T {
	return (...args: S[]) => args.reduce((acc, fn) => fn(acc), obj);
}
