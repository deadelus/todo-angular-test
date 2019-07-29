import { TestBed } from '@angular/core/testing';

import { HttpConfigInterceptor } from './http-config-interceptor.service';

describe('HttpConfigInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpConfigInterceptor
    ]
  }));

  it('should be created', () => {
    const service: HttpConfigInterceptor = TestBed.get(HttpConfigInterceptor);
    expect(service).toBeTruthy();
  });
});
