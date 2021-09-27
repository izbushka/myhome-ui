import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AUTH_BASE_URL} from '@entities/sensors.constants';
import {AuthUser, AuthUserResponse} from '@shared/entities/auth.interfaces';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthApiMapper} from './auth.api.mapper';

@Injectable()
export class AuthApiService {
	constructor(private http: HttpClient) {}

	public getUser(): Observable<AuthUser> {
		const url = `${AUTH_BASE_URL}/user`;

		return this.http.get<AuthUserResponse>(url).pipe(
			take(1),
			map((user) => AuthApiMapper.mapUser(user))
		);
	}
}
