import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlShortenerComponent } from './components/url-shortener/url-shortener.component';

const routes: Routes = [
  { path: '', redirectTo: 'url-shortener', pathMatch: 'full' },
  { path: 'url-shortener', component: UrlShortenerComponent },
  { path: 'url-shortener/:shortid', component: UrlShortenerComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
