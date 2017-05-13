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

  public loading = true;
  feedUrls: string[] = ['http://www.huffingtonpost.es/feeds/verticals/spain/index.xml','http://ep00.epimg.net/rss/elpais/portada.xml'];
  feedItems: any[] = [];
  noOfItems = 10; // This will have to be a config value
  public widgetdata;

  constructor(private feedRssService: FeedRssService) {
  }

  ngOnInit() {
    this.refreshFeed();
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
    for(let url of this.widgetdata.feedUrls) {
      this.feedRssService.getContent(url)
          .finally(() => this.sortItems())
          .subscribe(
              feed => {
                this.feedItems.push(...feed.items);
                this.loading = false;
              },
              error => console.log(error));
    }
  }

}
