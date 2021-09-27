export interface AuthUser {
	sessionId: string;
	googleId: string;
	userId: number;
	// TODO: map to camelCase
	user_id: number;
	created: number;
	email: string;
	verifiedEmail: boolean;
	authorized: boolean;
	picture: string;
	isAdmin: boolean;
}
