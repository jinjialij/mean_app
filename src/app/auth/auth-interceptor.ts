import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
/**
 * A middleware that intercept authorization in the header
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Inject authService to the AuthInterceptor
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      //add a new header
      headers: req.headers.set('Authorization', "Bearer " + authToken)
    });

    return next.handle(authRequest);
  }
}
