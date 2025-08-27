import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
      post: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });

    service = TestBed.inject(ProductsService);
  });

  it('deve chamar GET na API e retornar os produtos', (done) => {
    const mockResponse = [{ title: 'Produto A', tax: 10, term: 12 }];
    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.getApi().subscribe((data) => {
      expect(data).toEqual(mockResponse);
      expect(httpClientMock.get).toHaveBeenCalledWith('http://localhost:3000/products');
      done();
    });
  });

  it('deve chamar POST na API para adicionar produto', (done) => {
    const mockProduct = { title: 'Produto B', tax: 15, term: 24 };
    httpClientMock.post.mockReturnValue(of(mockProduct));

    service.addProduct(mockProduct.title, mockProduct.tax, mockProduct.term).subscribe((data) => {
      expect(data).toEqual(mockProduct);
      expect(httpClientMock.post).toHaveBeenCalledWith('http://localhost:3000/products', mockProduct);
      done();
    });
  });
});
