export interface JwtClaims {
  exp: number;
  iat: number;
  sub: string;
  username: string;
  emailAddress: string;
}
