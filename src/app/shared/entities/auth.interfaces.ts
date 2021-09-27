export interface AuthUser {
	sessionId: string;
	googleId: string;
	userId: number;
	created: number;
	email: string;
	verifiedEmail: boolean;
	authorized: boolean;
	picture: string;
	isAdmin: boolean;
}

export interface AuthUserResponse {
	session_id: string;
	google_id: string;
	user_id: number;
	created: number;
	email: string;
	verified_email: boolean;
	authorized: boolean;
	picture: string;
}
