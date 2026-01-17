import { JwtClaims } from './jwt';

export interface AuthenticatedRequest extends Request {
  cookies: {
    AUTH_TOKEN?: string;
  };
  user?: JwtClaims;
}
