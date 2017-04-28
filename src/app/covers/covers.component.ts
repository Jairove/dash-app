import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-covers',
  templateUrl: './covers.component.html',
  styleUrls: ['./covers.component.css']
})
export class CoversComponent implements OnInit {

  private routeToCover;
  public id = null;

  constructor() {}

  ngOnInit() {
      (<any>$('.cover-wrapper')).slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 7,
        slidesToScroll: 7,
        responsive: [
          {
            breakpoint: 1140,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
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
    }

    private changeCoverToBeOpened(route: string) {
      this.routeToCover = route;
    }

}
