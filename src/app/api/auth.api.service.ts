import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AUTH_BASE_URL } from '@entities/sensors.constants';
import { AuthUser } from '@shared/entities/auth.interfaces';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthApiService {
	constructor(private http: HttpClient) {}

	public getUser(): Observable<AuthUser> {
		const url = `${AUTH_BASE_URL}/user`;

		return this.http.get<AuthUser>(url).pipe(
			take(1)
		);
	}
}
