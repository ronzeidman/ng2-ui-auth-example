import { TestBed, inject } from '@angular/core/testing';

import { FormHelperService } from './form-helper.service';

describe('FormHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormHelperService]
    });
  });

  it('should be created', inject([FormHelperService], (service: FormHelperService) => {
    expect(service).toBeTruthy();
  }));
});
