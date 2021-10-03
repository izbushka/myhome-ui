import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_BASE_URL} from '@entities/sensors.constants';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {GeneralTableData} from '@entities/administration.interfaces';

@Injectable()
export class AdministrationApiService {
	constructor(private http: HttpClient) {}

	public getTable(table: string): Observable<GeneralTableData[]> {
		const url = `${API_BASE_URL}/../configuration/get/${table}`;

		return this.http.get<GeneralTableData[]>(url).pipe(take(1));
	}

	public saveTableRow(table: string, data: GeneralTableData): Observable<GeneralTableData[]> {
		const url = `${API_BASE_URL}/../configuration/save/${table}`;

		return this.http.post<GeneralTableData[]>(url, data).pipe(take(1));
	}
}
