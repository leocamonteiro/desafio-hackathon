import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SimulationComponent } from './pages/simulation/simulation.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: 'product-list', component: ProductListComponent },
    { path: 'simulation', component: SimulationComponent },
    { path: '**', component: NotFoundComponent }
];
