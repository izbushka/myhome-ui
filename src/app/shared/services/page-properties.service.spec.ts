import {TestBed} from '@angular/core/testing';

import {PagePropertiesService} from './page-properties.service';

describe('PagePropertiesService', () => {
  let service: PagePropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagePropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
