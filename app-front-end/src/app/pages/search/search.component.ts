import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModels2 } from 'src/app/models/models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  criterio: string="";
  resultado: ProductModels2[]=[];
  constructor(private router: ActivatedRoute, private ProductSrv: ProductsService, private route: Router) { 

    
    
    this.router.params.subscribe(params=>{

      this.criterio=params['criterio'];
      this.ProductSrv.getSearch(this.criterio).subscribe((data:ProductModels2[])=>{
        this.resultado=data
      });

    })
  }

  ngOnInit() {
  }

  metodoSearch(event: number){

    console.log(event);
    this.route.navigate(['/about']);

  }

}
