import { TestBed } from '@angular/core/testing';

import { ZoocareService } from './zoocare.service';

describe('ZoocareService', () => {
  let service: ZoocareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoocareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
