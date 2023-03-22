import { TestBed } from '@angular/core/testing';

import { InstaService } from './insta.service';
import { SharedModule } from './shared/shared.module';

describe('InstaService', () => {
  let service: InstaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[SharedModule]
    });
    service = TestBed.inject(InstaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should extract initials', () => {
    const res = service.extractInitials("Mangesh Kumar");
    expect(res).toBe("MK");
  })
});
