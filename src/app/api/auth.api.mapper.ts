import {AuthUser, AuthUserResponse} from '@shared/entities/auth.interfaces';
import {ADMIN_USER_IDS} from '@shared/entities/common.constants';

export class AuthApiMapper {
	public static mapUser(data: AuthUserResponse): AuthUser {
		return {
			sessionId: data.session_id,
			googleId: data.google_id,
			userId: data.user_id,
			created: data.created,
			email: data.email,
			verifiedEmail: data.verified_email,
			authorized: data.authorized,
			picture: data.picture,
			isAdmin: ADMIN_USER_IDS.includes(data.user_id),
		};
	}
}
