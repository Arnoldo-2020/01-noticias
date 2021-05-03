import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../interfaces/interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit() {
    
    this.loadNews();

  }

  loadData( event ){

    this.loadNews( event );


  }

  loadNews( event? ){

    this.noticiasService.getTopHeadlines()
      .subscribe(
        resp => {
          // console.log('Noticias ',resp );

          if(resp.articles.length === 0){
            event.target.disabled = true;
            event.target.complete();
          }

          this.noticias.push( ...resp.articles );

          if( event ){
            event.target.complete();
          }

        }

      );

    

  }

}
