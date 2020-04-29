import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModels2 } from 'src/app/models/models';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  product: ProductModels2 ={};
  category: string="";
  criterio:string="";
  

  constructor(private router:ActivatedRoute, private productSvc: ProductsService ,private route: Router){ 

    this.router.params.subscribe(params=>{

     const code= params['code'];
     this.category=params['category'];
     this.criterio=params['criterio'];
     
     
    this.productSvc.getByCode(code).subscribe((data: ProductModels2)=>{
      this.product=data;
    })


    });

  }

  
changeRoute(){

if (this.criterio!="undefined") {
  this.route.navigate(['/search', this.criterio])
} else {
  this.route.navigate(['/products/categories', this.category])
}

}
  

  ngOnInit() {
  }
  

}
