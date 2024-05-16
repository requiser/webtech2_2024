import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AccessTokenInterceptor } from './access-token.interceptor';

describe('AccessTokenInterceptor', () => {
  let interceptor: HttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        AccessTokenInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AccessTokenInterceptor,
          multi: true
        }
      ]
    });

    interceptor = TestBed.inject(HTTP_INTERCEPTORS)[0];
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
