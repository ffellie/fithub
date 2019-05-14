import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service'
import { News } from 'src/app/models/models'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news:News[] ;
  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.getNews();
  }


  getNews = () => {
    this.provider.getNews().subscribe(
      data => {
        this.news = data;
      },
      error => {
        console.log(error);
      }
    )
}

}
