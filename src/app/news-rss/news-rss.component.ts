import { Component, OnInit } from '@angular/core';
import { FeedRssService } from './feed-rss.service'

@Component({
  selector: 'app-news-rss',
  templateUrl: './news-rss.component.html',
  styleUrls: ['./news-rss.component.css'],
  providers: [ FeedRssService ]
})
export class NewsRssComponent implements OnInit {

  feedUrls: string[] = ['http://rss.nytimes.com/services/xml/rss/nyt/World.xml','http://feeds.washingtonpost.com/rss/world','http://ep00.epimg.net/rss/elpais/portada.xml'];
  feedItems: Array<any> = [];

  constructor(private feedRssService: FeedRssService) { }

  ngOnInit() {
    this.refreshFeed();
  }

  private refreshFeed() { 
    for(let url of this.feedUrls) {
      this.feedRssService.getContent(url)
          .subscribe(
              feed => Object.assign(this.feedItems, this.feedItems, feed.items),
              error => console.log(error));
    }
  }

/*private sortArrayByDate():any {
    this.feedItems.sort(function(a,b):any{
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });
}*/


}
