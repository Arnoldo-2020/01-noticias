import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../interfaces/interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  noticias: Article[] = [];

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.LoadNews(this.segment.value);
  }

  changeCategory( event: CustomEvent ){
    this.noticias = [];
    
    this.LoadNews(event.detail.value);
  }

  LoadNews(categoria: string, event?){

    this.noticiasService.getTopHeadlinesCategoria(categoria)
      .subscribe(resp => {
        // console.log(resp);

        // if( resp.articles.length === 0 ){
        //   event.target.disabled = true;
        //   event.target.complete();
        // }

        this.noticias.push(...resp.articles);

        if( event ){
          event.target.complete();
        }
      });

  }

  loadData( event ){

    this.LoadNews( this.segment.value, event );

  }

}
