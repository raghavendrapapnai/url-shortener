import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-url-shortener',
  templateUrl: './url-shortener.component.html',
  styleUrls: ['./url-shortener.component.css']
})
export class UrlShortenerComponent implements OnInit {
  fullUrl: string = '';
  shortUrl: string = '';
  allUrls: any;
  urlForm: any;

  constructor(private urlService: UrlService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUrls()
  }

  getUrls() {
    this.urlService.getAll().subscribe(res => {
      console.log(res)
      this.allUrls = res
    })
  }

  onSubmitUrlForm() {
    console.log(this.fullUrl);
    this.urlService.sendLongUrl(this.fullUrl).subscribe(data => {
      console.log(data)
    })
    setTimeout(() => {
      this.getUrls()
    }, 500);
  }

  shortUrlClicked(shortUrl: any) {
    this.urlService.getShortUrl(shortUrl).subscribe(res => {
      console.log(res)
    })
  }

}
