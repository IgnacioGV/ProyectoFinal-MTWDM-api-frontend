import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService  } from "src/app/services/countries.service";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styles: []
})
export class CountriesComponent implements OnInit {


  countrylist: any = {}

  constructor(private router: ActivatedRoute, private CountServ: CountriesService) { 

    this.CountServ.getAllCountries().subscribe(data=>{
      this.countrylist=data 
    })

  }

  ngOnInit() {
  }

}
