import { Component, OnInit } from '@angular/core';
import { FeedRssService } from './feed-rss.service'

@Component({
  selector: 'app-news-rss',
  templateUrl: './news-rss.component.html',
  styleUrls: ['./news-rss.component.css'],
  providers: [ FeedRssService ]
})
export class NewsRssComponent implements OnInit {

  feedUrl: String = 'http://rss.nytimes.com/services/xml/rss/nyt/World.xml';
  feedItems: Array<any> = [];

  constructor(private feedRssService: FeedRssService) { }

  ngOnInit() {
    this.refreshFeed();
  }

  private refreshFeed() {
    this.feedRssService.getContent(this.feedUrl)
        .subscribe(
            feed => this.feedItems = feed.items,
            error => console.log(error));
  }

}
