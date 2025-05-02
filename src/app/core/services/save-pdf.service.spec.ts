import { TestBed } from '@angular/core/testing';

import { SavePdfService } from './save-pdf.service';

describe('SavePdfService', () => {
  let service: SavePdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavePdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
