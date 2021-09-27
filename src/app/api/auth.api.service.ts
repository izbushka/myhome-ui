import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AUTH_BASE_URL } from '@entities/sensors.constants';
import { AuthUser } from '@shared/entities/auth.interfaces';
import { ADMIN_USER_IDS } from '@shared/entities/common.constants';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthApiService {
	constructor(private http: HttpClient) {}

	public getUser(): Observable<AuthUser> {
		const url = `${AUTH_BASE_URL}/user`;

		return this.http.get<AuthUser>(url).pipe(
			take(1),
			map((user) =>  ({
					...user,
					isAdmin: ADMIN_USER_IDS.includes(user.user_id),
				})
			)
		);
	}
}
