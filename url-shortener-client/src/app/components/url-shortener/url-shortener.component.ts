import { Component, OnInit } from '@angular/core';
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

  constructor(private urlService: UrlService) { }

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

  shortUrlClick(_id: any) {
    this.urlService.getShortUrl(_id).subscribe(res => {
      console.log(res);

    })
  }

}
