import { SimulationComponent } from './simulation.component';
import { ProductsService } from 'src/app/services/products.service';
import { SimulatorService } from 'src/app/services/simulator.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('SimulationComponent', () => {
  let component: SimulationComponent;
  let productsServiceMock: any;
  let simulatorServiceMock: any;

  beforeEach(() => {
    productsServiceMock = {
      getApi: jest.fn()
    };

    simulatorServiceMock = {
      simulateLoan: jest.fn()
    };

    component = new SimulationComponent(
      new FormBuilder(),
      productsServiceMock,
      simulatorServiceMock
    );
  });

  it('deve inicializar o formulário corretamente', () => {
    productsServiceMock.getApi.mockReturnValue(of([])); // ✅ mock necessário
    component.ngOnInit();

    expect(component.simulationForm).toBeDefined();
    expect(component.simulationForm.get('product')?.disabled).toBe(false);
    expect(component.simulationForm.get('amount')?.disabled).toBe(true);
    expect(component.simulationForm.get('term')?.disabled).toBe(true);
  });

  it('deve carregar os produtos e popular as opções', () => {
    const mockProducts = [
      { title: 'Produto A', term: 12, tax: 10 },
      { title: 'Produto B', term: 24, tax: 15 }
    ];

    productsServiceMock.getApi.mockReturnValue(of(mockProducts));
    component.ngOnInit();

    expect(productsServiceMock.getApi).toHaveBeenCalled();
    expect(component.options.length).toBe(2);
    expect(component.options[0].label).toBe('Produto A');
  });

  it('deve habilitar campos e aplicar validações ao selecionar produto', () => {
    const mockProduct = { title: 'Produto A', term: 12, tax: 10 };

    productsServiceMock.getApi.mockReturnValue(of([mockProduct])); // ✅ mock necessário
    component.ngOnInit();

    component.simulationForm.get('product')?.setValue(mockProduct);

    expect(component.simulationForm.get('amount')?.enabled).toBe(true);
    expect(component.simulationForm.get('term')?.enabled).toBe(true);
    expect(component.simulationForm.get('term')?.validator).toBeDefined();
  });

  it('deve chamar o serviço de simulação ao submeter o formulário', () => {
    const mockProduct = { title: 'Produto A', term: 12, tax: 10 };
    const mockFormData = {
      product: mockProduct,
      amount: '10000',
      term: '12'
    };

    const mockResultado = {
      produto: 'Produto A',
      valorSolicitado: 10000,
      prazo: 12,
      taxaEfetivaMensal: 0.79,
      parcelaMensal: 879.16,
      valorTotalComJuros: 10549.92,
      memoriaCalculo: []
    };

    simulatorServiceMock.simulateLoan.mockReturnValue(mockResultado);
    component.onSimulate(mockFormData);

    expect(simulatorServiceMock.simulateLoan).toHaveBeenCalledWith(
      mockProduct,
      '10000',
      '12'
    );
    expect(component.resultadoSimulacao).toEqual(mockResultado);
  });
});
