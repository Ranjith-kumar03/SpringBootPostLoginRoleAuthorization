import { TestBed } from '@angular/core/testing';

import { AutHguardGuard } from './aut-hguard.guard';

describe('AutHguardGuard', () => {
  let guard: AutHguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutHguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
