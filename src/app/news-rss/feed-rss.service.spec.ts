/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeedRssService } from './feed-rss.service';

describe('RssServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedRssService]
    });
  });

  it('should ...', inject([FeedRssService], (service: FeedRssService) => {
    expect(service).toBeTruthy();
  }));
});
