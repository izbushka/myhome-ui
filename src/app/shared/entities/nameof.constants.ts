export const nameOf = <T>(name: keyof T): string => name as string;
export const nameOfFactory =
	<T>() =>
	(name: keyof T): string =>
		name as string;
