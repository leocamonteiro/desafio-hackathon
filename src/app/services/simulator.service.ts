import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {

  // Implementação do serviço de simulação de empréstimo -> será implementado pelo backend
  simulateLoan(product: any, amount: string, term: string) {
    const valorSolicitado = parseFloat((amount + '').replace(/[^\d,]/g, '').replace(',', '.'));
    const prazo = parseInt(term, 10);
    const taxaAnual = product.tax;

    const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;

    const parcela = valorSolicitado * (taxaMensal * Math.pow(1 + taxaMensal, prazo)) / (Math.pow(1 + taxaMensal, prazo) - 1);
    const parcelaFinal = parseFloat(parcela.toFixed(2));
    const valorTotal = parseFloat((parcelaFinal * prazo).toFixed(2));

    let saldoDevedor = valorSolicitado;
    const memoriaCalculo = [];

    for (let mes = 1; mes <= prazo; mes++) {
      const juros = parseFloat((saldoDevedor * taxaMensal).toFixed(2));
      const amortizacao = parseFloat((parcelaFinal - juros).toFixed(2));
      saldoDevedor = parseFloat((saldoDevedor - amortizacao).toFixed(2));

      memoriaCalculo.push({
        mes,
        juros,
        amortizacao,
        saldo: saldoDevedor
      });
    }

    return {
      produto: product.title,
      valorSolicitado,
      prazo,
      taxaEfetivaMensal: parseFloat((taxaMensal * 100).toFixed(2)),
      parcelaMensal: parcelaFinal,
      valorTotalComJuros: valorTotal,
      memoriaCalculo
    };
  }
}
