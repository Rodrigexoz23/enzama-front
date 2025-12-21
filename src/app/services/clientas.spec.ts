import { TestBed } from '@angular/core/testing';

import { Clientas } from './clientas';

describe('Clientas', () => {
  let service: Clientas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Clientas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
