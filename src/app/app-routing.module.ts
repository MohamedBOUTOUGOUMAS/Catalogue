import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginV2Component } from './login-v2/login-v2.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', component: LoginV2Component },
  { path: 'products', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
