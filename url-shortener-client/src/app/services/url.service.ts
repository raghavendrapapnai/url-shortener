import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  backend_url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  sendLongUrl(fullUrl: string) {
    return this.http.post(`${this.backend_url}`, fullUrl)
  }

}
