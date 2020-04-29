//Imports Angular

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//Imports Components
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { CategoriesComponent } from './pages/products/categories/categories.component';
import { SearchComponent } from './pages/search/search.component';
import { CountriesComponent } from './pages/countries/countries.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent, data:{title: 'Inicio', icon: 'fa-home'} },
    { path: 'about', component: AboutComponent, data:{title: 'Acerca de', icon: 'fa-address-card'}  },
    { path: 'products', 
      component: ProductsComponent,
      children:[
        
        { path: 'categories/:category', component: CategoriesComponent},
        { path: '', redirectTo:'categories/Cars', pathMatch:'full'},
        { path: '**', redirectTo:'categories/Cars', pathMatch:'full' }
      ],
      data:{title: 'Productos', icon: 'fa-shopping-basket'} 
    },
    { path: 'product/:code/:category', component: ProductComponent },
    { path: 'search/:criterio', component: SearchComponent},
    { path: 'countries', component: CountriesComponent, data:{title: 'Paises', icon: 'fa-globe'}},
    { path: '', redirectTo:'/home', pathMatch:'full'},
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
