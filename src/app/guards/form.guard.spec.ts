import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { formGuard } from './form.guard';

describe('formGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
