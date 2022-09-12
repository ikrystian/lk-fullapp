import { JwtService } from '../shared/jwt.service';

export const appInitializer = (authService: JwtService)  => new Promise(resolve => {
  authService.refreshToken()
    .subscribe()
});
