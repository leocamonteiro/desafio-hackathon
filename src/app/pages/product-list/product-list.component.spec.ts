import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductsService } from 'src/app/services/products.service';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductsService: jest.Mocked<ProductsService>;

  beforeEach(async () => {
    mockProductsService = {
      getApi: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductsService, useValue: mockProductsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar produtos e configurar colunas ao inicializar', () => {
    const mockData = [
      { title: 'Produto A', tax: 10, term: 12 },
      { title: 'Produto B', tax: 15, term: 24 },
      { title: 'Produto C', tax: 20, term: 36 },
      { title: 'Produto D', tax: 25, term: 48 }
    ];

    mockProductsService.getApi.mockReturnValue(of(mockData));

    component.ngOnInit();

    expect(mockProductsService.getApi).toHaveBeenCalled();
    expect(component.produtos).toEqual(mockData);
    expect(component.data).toEqual(mockData);
    expect(component.selectedRows).toEqual([mockData[1], mockData[3]]);
    expect(component.colunas.length).toBe(3);
  });

  it('criaColunas deve retornar colunas formatadas corretamente', () => {
    const colunas = (component as any).criaColunas();

    expect(colunas.length).toBe(3);
    expect(colunas[0].property).toBe('title');
    expect(colunas[1].property).toBe('tax');
    expect(colunas[2].property).toBe('term');

    const exemplo: any = { title: 'Produto X', tax: 12.5, term: 18 };
    expect(colunas[1].value(exemplo)).toBe('12,50%a.a');
    expect(colunas[2].value(exemplo)).toBe('18 meses');
  });
});
