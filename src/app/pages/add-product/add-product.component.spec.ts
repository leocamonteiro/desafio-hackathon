import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import { ProductsService } from 'src/app/services/products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let mockProductsService: jest.Mocked<ProductsService>;

  beforeEach(async () => {
    mockProductsService = {
      addProduct: jest.fn()
    } as any;


    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule, // ✅ Adicionado aqui
        AddProductComponent
      ],
      providers: [
        { provide: ProductsService, useValue: mockProductsService }
      ]
    }).compileComponents();
    

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o formulário com campos obrigatórios', () => {
    expect(component.productForm).toBeDefined();
    expect(component.productForm.get('title')).toBeTruthy();
    expect(component.productForm.get('tax')).toBeTruthy();
    expect(component.productForm.get('term')).toBeTruthy();
  });

  it('deve chamar addProduct quando o formulário for válido', () => {
    const mockResponse = { success: true };
    mockProductsService.addProduct.mockReturnValue(of(mockResponse));

    component.productForm.setValue({
      title: 'Produto Teste',
      tax: 10,
      term: 12
    });

    component.onSubmit();

    expect(mockProductsService.addProduct).toHaveBeenCalledWith('Produto Teste', 10, 12);
    expect(component.showAlert).toBe(true);
  });

  it('não deve chamar addProduct se o formulário for inválido', () => {
    component.productForm.setValue({
      title: '',
      tax: null,
      term: ''
    });

    component.onSubmit();

    expect(mockProductsService.addProduct).not.toHaveBeenCalled();
  });
});
