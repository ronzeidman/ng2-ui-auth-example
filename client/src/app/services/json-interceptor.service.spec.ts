import { TestBed, inject } from '@angular/core/testing';

import { JsonInterceptorService } from './json-interceptor.service';

describe('JsonInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonInterceptorService]
    });
  });

  it('should be created', inject([JsonInterceptorService], (service: JsonInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
