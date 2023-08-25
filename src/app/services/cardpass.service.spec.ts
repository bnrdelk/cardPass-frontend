import { TestBed } from '@angular/core/testing';

import { CardpassService } from './cardpass.service';

describe('CardpassService', () => {
  let service: CardpassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardpassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
