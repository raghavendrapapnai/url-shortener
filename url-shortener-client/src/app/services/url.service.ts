import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from '../model/url.model';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  backend_url = 'http://localhost:3000'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.backend_url)
  }

  sendLongUrl(fullUrl: string) {
    return this.http.post(`${this.backend_url}/short`, { fullUrl: fullUrl })
  }

  getShortUrl(shortUrl: any) {
    console.log(`${this.backend_url}/${shortUrl}`)
    return this.http.get(`${this.backend_url}/${shortUrl}`)


  }

}
