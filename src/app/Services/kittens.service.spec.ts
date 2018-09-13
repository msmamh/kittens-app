import { TestBed, inject } from '@angular/core/testing';

import { KittensService } from './kittens.service';

describe('KittensService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KittensService]
    });
  });

  it('should be created', inject([KittensService], (service: KittensService) => {
    expect(service).toBeTruthy();
  }));
});
