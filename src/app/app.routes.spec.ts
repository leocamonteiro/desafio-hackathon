// app.routes.spec.ts
import { routes } from './app.routes';
import { HomeComponent } from './pages/home/home.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SimulationComponent } from './pages/simulation/simulation.component';

describe('App Routes', () => {
  it('should define the correct number of routes', () => {
    expect(routes.length).toBe(5);
  });

  it('should have a route for "" mapped to HomeComponent', () => {
    const route = routes.find(r => r.path === '');
    expect(route).toBeDefined();
    expect(route?.component).toBe(HomeComponent);
  });

  it('should have a route for "add-product" mapped to AddProductComponent', () => {
    const route = routes.find(r => r.path === 'add-product');
    expect(route).toBeDefined();
    expect(route?.component).toBe(AddProductComponent);
  });

  it('should have a route for "product-list" mapped to ProductListComponent', () => {
    const route = routes.find(r => r.path === 'product-list');
    expect(route).toBeDefined();
    expect(route?.component).toBe(ProductListComponent);
  });

  it('should have a route for "simulation" mapped to SimulationComponent', () => {
    const route = routes.find(r => r.path === 'simulation');
    expect(route).toBeDefined();
    expect(route?.component).toBe(SimulationComponent);
  });
});
