import { TestBed } from '@angular/core/testing';

import { EventPublisherService } from './event-publisher.service';

describe('EventPublisherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventPublisherService = TestBed.get(EventPublisherService);
    expect(service).toBeTruthy();
  });
});
