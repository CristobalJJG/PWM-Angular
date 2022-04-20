import { Component } from '@angular/core';
import { JSONService } from '../../services/json.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})

export class CatalogoComponent {

  public productos:any = [];

  auth = getAuth();
  constructor(public json:JSONService,  ){
     
    this.json.getJSONProducts()
            .subscribe( resp => {
               let aux:any = resp;
			         this.productos = aux.Productos;
            });
  }

}
