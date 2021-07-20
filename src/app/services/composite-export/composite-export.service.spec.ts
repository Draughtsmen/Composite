import { TestBed } from '@angular/core/testing';

import { CompositeExportService } from './composite-export.service';

describe('CompositeExportService', () => {
  let service: CompositeExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompositeExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
