import { FeedEntry } from './feedEntry';
import { Component, OnInit } from '@angular/core';
import { FeedRssService } from './feed-rss.service'

@Component({
  selector: 'app-news-rss',
  templateUrl: './news-rss.component.html',
  styleUrls: ['./news-rss.component.css'],
  providers: [ FeedRssService ]
})
export class NewsRssComponent implements OnInit {

  feedUrls: string[] = ['http://www.huffingtonpost.es/feeds/verticals/spain/index.xml','http://ep00.epimg.net/rss/elpais/portada.xml'];
  feedItems: any[] = [];
  noOfItems = 10; // This will have to be a config value
  public id = null;

  constructor(private feedRssService: FeedRssService) {
    this.refreshFeed();
  }

  ngOnInit() {

  }

  private sortItems() {
    this.feedItems.sort(
      (a,b): number => {
        let date1 = +new Date(b.pubDate);
        let date2 = +new Date(a.pubDate);
        return date1 - date2;
      }
    );
    this.feedItems.splice(this.noOfItems);
  }

  private refreshFeed() {
    for(let url of this.feedUrls) {
      this.feedRssService.getContent(url)
          .finally(() => this.sortItems())
          .subscribe(
              feed => {
                this.feedItems.push(...feed.items);
              },
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
