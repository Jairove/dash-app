import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-covers',
  templateUrl: './covers.component.html',
  styleUrls: ['./covers.component.css']
})
export class CoversComponent implements OnInit {
  public slideIndex;

  constructor() {
    this.slideIndex = 1;
}

  public displayModal = 'none';

  public openModal(): void {
    var modal: HTMLElement = document.getElementById('myModal')
    modal.style.display = "block";
  }

  public closeModal(): void {
    var modal: HTMLElement = document.getElementById('myModal')
    modal.style.display = "none";
  }

  public plusSlides(n): void {
    this.showSlides(this.slideIndex += n);
  }

  public currentSlide(n: number): void {
    this.showSlides(this.slideIndex = n);
  }

  public showSlides(n: number): void {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      (<HTMLElement>slides[i]).style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    (<HTMLElement>slides[this.slideIndex-1]).style.display = "block";
    dots[this.slideIndex-1].className += " active";
  }

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
      this.showSlides(this.slideIndex);
    }

}
