import { TestBed } from '@angular/core/testing';

import { JsonInterceptorService } from './json-interceptor.service';

describe('JsonInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonInterceptorService = TestBed.get(JsonInterceptorService);
    expect(service).toBeTruthy();
  });
});
