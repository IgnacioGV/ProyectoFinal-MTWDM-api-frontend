import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModels2 } from 'src/app/models/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {

  misdatos:ProductModels2[]=[]
  category: string='';
  constructor(private router: ActivatedRoute, private productServ: ProductsService, private route: Router) { 

    this.router.params.subscribe(params=>{

      this.category= params['category'];
      this.productServ.getCategory(this.category).subscribe((data: ProductModels2[])=>{
        this.misdatos=data
      })
      
    })

  }

  ngOnInit() {
  }

  metodoCat(event: number){

    console.log(event)
    this.route.navigate(['/home'])
  }

}
