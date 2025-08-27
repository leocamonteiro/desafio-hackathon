import { TestBed } from '@angular/core/testing';

import { SimulatorService } from './simulator.service';

describe('SimulationService', () => {
  let service: SimulatorService;

  beforeEach(() => {
    service = new SimulatorService();
  });

  it('deve calcular corretamente a simulação de empréstimo', () => {
    const product = { title: 'Produto A', tax: 12 };
    const result = service.simulateLoan(product, '1000', '12');

    expect(result.valorSolicitado).toBe(1000);
    expect(result.prazo).toBe(12);
    expect(result.memoriaCalculo.length).toBe(12);
  });
});


