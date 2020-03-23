import { TestBed } from '@angular/core/testing';

import { VisibilityApiService } from './visibility-api.service';

describe('VisibilityApiService', () => {
  let service: VisibilityApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisibilityApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
