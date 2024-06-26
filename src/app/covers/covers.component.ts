import { Component, OnInit, DoCheck } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-covers',
  templateUrl: './covers.component.html',
  styleUrls: ['./covers.component.css']
})
export class CoversComponent implements OnInit {

  private routeToCover;
  public widgetdata;
  private coversUrls = [];
  private loading = true;
  private slicked = false;

  constructor(private http: Http) {}

  ngOnInit() {
      this.refreshCovers();
  }

  ngDoCheck() {
    if(!this.loading && !this.slicked) {
      setTimeout(() => this.adjustSlicker(), 3000);
    }
  }

  private adjustSlicker() {
      (<any>$('.cover-wrapper')).not('.slick-initialized').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows : false,
        responsive: [
          {
            breakpoint: 1240,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 680,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      });
      this.slicked = true;
    }

    private changeCoverToBeOpened(route: string) {
      this.routeToCover = route;
    }

    private refreshCovers() {
      var dt = new Date();
      var todayString = dt.getFullYear() + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) +
                        "/" + ("0" + dt.getDate()).slice(-2);
      dt.setDate(dt.getDate()-1);
      var yesterdayString = dt.getFullYear() + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) +
                                          "/" + ("0" + dt.getDate()).slice(-2);

      var coverUrls = ["/es/elpais","/es/elmundo","/es/abc","/us/newyork_times","/uk/the_times","/es/marca","/es/mundodeportivo"];

      for(var i=0; i < coverUrls.length; i++) {
        this.getAvailableCovers(coverUrls[i], todayString)
            .subscribe(
                response => {
                  if(response!='ok') {
                    this.getAvailableCovers(coverUrls[i], yesterdayString)
                        .subscribe();
                  }
                },
                error => console.log(error));
      }

      this.loading = false;
    }


    private getAvailableCovers(coverurl: string, dateString: string): Observable<string> {
      var baseUrl = '/api/coverproxy/';
      var format = '.750.jpg';
      var cvUrl = dateString + coverurl + format;
      var requestUrl = baseUrl + encodeURIComponent(cvUrl);
      return this.http.get(requestUrl)
              .map(
                (res: Response) => {
                  if(res.json() == 'ok') this.coversUrls.push('http://img.kiosko.net/'+cvUrl);
                  return res.json();
                })
              .catch(this.handleError);
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
    }


}
