import {ColumnsOrder, GeneralTableData} from '@shared/entities/administration.interfaces';

export class DbTablesHelper {
	public static SortColumns(row: GeneralTableData): string[] {
		const toTheEnd = 10000;
		return Object.keys(row ?? {}).sort(
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			(a, b) => (ColumnsOrder[a] || toTheEnd) - (ColumnsOrder[b] || toTheEnd)
		);
	}
}
