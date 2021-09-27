export interface AuthUser {
	sessionId: string;
	googleId: string;
	userId: number;
	created: number;
	email: string;
	verifiedEmail: boolean;
	authorized: boolean;
	picture: string;
}
