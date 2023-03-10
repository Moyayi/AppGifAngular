import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifService : GifsService){}

  get historial():string[]{
    return [...this.gifService.historial]
  }

  buscar ( termino : string ) {
    this.gifService.buscarGifs(termino)
  }
  clear ( arg : string){
    this.gifService.clear(arg)
  }
}
