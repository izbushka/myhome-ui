export class StringsHelper {
	public static splitCamelCase(str: string): string {
		return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
	}
}
