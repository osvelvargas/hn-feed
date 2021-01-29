import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})

export class AppComponent {
  title = 'front';
  hits = [];
  today = new Date();
  yesterday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1);
  constructor(private httpClient: HttpClient) {
    this.fillTable();
  }

  fillTable(): void {
    this.httpClient.get('http://localhost:8081/getNews').subscribe((result: any[]) => {
      result.forEach(item => {
        if (item.title || item.story_title){
          let day = 'other';
          if (this.today.toISOString().slice(0, 10) === new Date(item.created_at).toISOString().slice(0, 10)){
            day = 'today';
          }
          if (this.yesterday.toISOString().slice(0, 10) === new Date(item.created_at).toISOString().slice(0, 10)){
            day = 'yesterday';
          }

          const hit = {
            id: item._id,
            title: item.story_title ? item.story_title : item.title,
            author: item.author,
            created_at: new Date(item.created_at),
            url: item.url,
            day: day
          };
          this.hits.push(hit);
        }
      });
    });
  }

  openUrl(url: any): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  delHit(id: any): void {
    this.httpClient.get('http://localhost:8081/noShowNews?id=' + id).subscribe((result: any[]) => {
      if (result){
        this.hits = [];
        this.fillTable();
      }
    });
  }
}
