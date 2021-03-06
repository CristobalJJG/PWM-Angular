import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { finalize, Observable } from 'rxjs';
import { FileUpload } from 'src/interfaces/fileUpload';
import { NewProduct } from 'src/interfaces/newProduct';
import { AuthService } from './auth.service';
import { JSONService } from './json.service';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(private db: AngularFirestore,
    private storage: AngularFireStorage,
    private auth:AuthService,
    public json:JSONService) { }

  async getAllProducts(){
    return new Promise<any>((resolve) => {
      this.db.collection('Objetos')
      .valueChanges({ idField: 'id' })
      .subscribe(users => resolve(users));
    })
  }

  addJSONToFirebase(){
    this.json.getJSONProducts().subscribe((data) => { 
      //Función para agregar productos a la base de datos   
      for (let i = 0; i < data.length; i++) {
        this.addProduct(
          data[i].id,
          data[i].nombre,
          data[i].descripcion,
          data[i].precio,
          data[i].categoria,
          data[i].empresa,
          data[i].mainPhoto,
          data[i].altPhotos
        );
      } 
      
    });
  }

  addNewProduct(product:NewProduct){
    this.db.collection("Objetos")
      .doc(product.id)
      .set({
        nombre:product.nombre,
        descripcion:product.descripcion,
        ubicaciones: product.ubicaciones,
        precio:product.precio,
        categoria:product.categoria,
        mainPhoto:product.mainPhoto,
      });
  }

  addProduct(id:number,
    nombre_:string,
    descripcion_:string,
    precio_:number,
    categoria_:string,
    empresa_:string,
    mainPhoto_:string,
    altPhotos_:[]){
      this.db.collection("Objetos")
      .doc(id + "")
      .set({
        nombre:nombre_,
        descripcion:descripcion_,
        precio:precio_,
        categoria:categoria_,
        empresa: empresa_,
        mainPhoto:mainPhoto_,
        altPhotos:altPhotos_
      });
  }
}
