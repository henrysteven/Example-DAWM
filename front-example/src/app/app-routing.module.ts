import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ProductComponent } from './page/product/product.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        //canActivate: [AuthTokenAdminGuardGuard],
        title: 'home',
    },
    {
        path: 'product',
        component: ProductComponent,
        //canActivate: [AuthTokenAdminGuardGuard],
        title: 'Products',
    },
    { path: '**', component: ProductComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
