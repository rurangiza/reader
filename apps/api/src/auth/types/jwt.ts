export interface JwtClaims {
  emailAddress: string;
  exp: number;
  iat: number;
  sub: string;
  username: string;
}
