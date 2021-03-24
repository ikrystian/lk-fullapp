import { JwtService } from '../shared/jwt.service';

export function appInitializer(authenticationService: JwtService) {
  return () => new Promise(resolve => {
    authenticationService.refreshToken()
      .subscribe()
      .add(resolve);
  });
}
