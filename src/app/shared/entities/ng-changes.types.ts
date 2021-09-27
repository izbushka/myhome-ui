import {Subject} from 'rxjs';
/* eslint-disable @typescript-eslint/ban-types */
export type NgChanges<Component extends object, Props = ExcludeFunctions<Component>> = {
	[Key in keyof Props]: {
		previousValue: Props[Key];
		currentValue: Props[Key];
		firstChange: boolean;
		isFirstChange(): boolean;
	};
};

type MarkFunctionPropertyNames<Component> = {
	[Key in keyof Component]: Component[Key] extends Function | Subject<never> ? never : Key;
};

type ExcludeFunctionPropertyNames<T extends object> = MarkFunctionPropertyNames<T>[keyof T];

type ExcludeFunctions<T extends object> = Pick<T, ExcludeFunctionPropertyNames<T>>;
