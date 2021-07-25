export class ActionsHelper {
	private static ACTION_NAMES: Record<string, boolean> = {};

	public static getDescription<T>(moduleName: keyof T): (action: string) => string {
		return (action) => {
			const name = `[${moduleName as string}] ${action}`;
			if (ActionsHelper.ACTION_NAMES[name]) {
				throw `Action name "${name}" is already used`;
			}
			ActionsHelper.ACTION_NAMES[name] = true;
			return name;
		};
	}
}
