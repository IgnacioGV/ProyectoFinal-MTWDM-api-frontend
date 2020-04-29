import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductModel, ProductModels2 } from 'src/app/models/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit, OnDestroy {

  misdatos: ProductModels2 []=[];
  
  
  constructor(private productsServ: ProductsService) { 
    //cmd+shift+7
    // this.productsServ.getAll().subscribe((data: ProductModels2[])=>{

    //   this.misdatos=data;

    // });
    
    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    
    
  }

}
