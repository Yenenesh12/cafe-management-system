import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtInterceptor } from './../interceptors/jwt.interceptor';

describe('JwtInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JwtInterceptor
      ]
    });
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
