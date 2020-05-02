import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProductModels2 } from '../models/models';
import { Observable } from 'rxjs';

//const URL_PRODUCTS='https://mtwdm-front-end.firebaseio.com/productos.json';
//const URL_BASE='http://localhost:5000';

const URL_BASE='http://api.midominio.com';

localStorage.setItem('auth_token', '');

/*
    -Login--> Metodo Post (http://api.midominio.com/login)
		-Lista de Productos--> Get (http://api.midominio.com/products)
		-Producto por id/codigo --> Get (http://api.midominio.com/product/id)	
		-Obtener por nombre categorias --> Get (http://api.midominio.com/categories/name)	
		-Search --> Get (http://api.midominio.com/search/name)		

*/

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { 

  }

  getAll(){
    const headers=new HttpHeaders({
      'authorization': 'bearer ' + localStorage.getItem('auth_token')
    });
     return new Observable(observer=>{

       this.http.get(URL_BASE+'/products', {headers: headers}).subscribe((data:ProductModels2[])=>{
        let opt=data['result']
        let res=opt['products']
        observer.next(res);
       });
     });
     
     
  }

  getCategory(category: string){
    const headers=new HttpHeaders({
      'authorization': 'bearer ' + localStorage.getItem('auth_token')
    });
    
    return new Observable(observer=>{
      this.http.get(URL_BASE+'/categories/'+category, {headers: headers}).subscribe((data: ProductModels2[])=>{
        let opt=data['result']
        let res=opt['category']
        observer.next(res);
      });
    });
  }

  getByCode(code: string){

    const headers=new HttpHeaders({
      'authorization': 'bearer ' + localStorage.getItem('auth_token')
    });

    return new Observable (observer=>{
      this.http.get(URL_BASE+'/product/'+code, {headers: headers}).subscribe((data: ProductModels2[])=>{
        let opt=data['result']
        let res=opt['products']
        observer.next(res[0])
      });
    });
  }

  
  getSearch(buscar: string){


      const headers=new HttpHeaders({
        'authorization': 'bearer ' + localStorage.getItem('auth_token')
      });
  
      return new Observable(observer=>{
  
        this.http.get(URL_BASE+'/search/'+buscar, {headers: headers}).subscribe((data: ProductModels2[])=>{
          let opt=data['result']
          let res=opt['product']
          observer.next(res)
        });
      });
  }
}
