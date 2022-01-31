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

  constructor(private urlService: UrlService) { }

  ngOnInit(): void {
  }

  onSubmitUrlForm() {
    console.log(this.fullUrl);
    this.urlService.sendLongUrl(this.fullUrl).subscribe(data => {
      console.log(data);

    })
  }

}
