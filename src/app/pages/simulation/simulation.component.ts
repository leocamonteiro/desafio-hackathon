import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DscInputComponent } from 'sidsc-components/dsc-input';
import { DscCardComponent } from 'sidsc-components/dsc-card';
import { DscButtonComponent } from 'sidsc-components/dsc-button';
import { DscSelectComponent, Option } from 'sidsc-components/dsc-select';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DscInputCurrencyComponent } from "sidsc-components/dsc-input-currency";
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { SimulatorService } from 'src/app/services/simulator.service';

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [CommonModule, DscInputComponent, DscCardComponent, DscButtonComponent, DscSelectComponent, ReactiveFormsModule, DscInputCurrencyComponent],
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})

export class SimulationComponent implements OnInit {
  options: Option[] = [];
  simulationForm!: FormGroup;
  resultadoSimulacao: any = null;
  selectedProduct: any = null;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private simulatorService: SimulatorService
  ) {}

  ngOnInit(): void {
    // Validação do Formulário
    this.simulationForm = this.fb.group({
      product: [null, Validators.required],
      amount: [{ value: '', disabled: true }, Validators.required],
      term: [{ value: '', disabled: true }, Validators.required]
    });

    // Validação do prazo (não pode ser superior ao prazo máximo cadastrado)
    function prazoMaximoValidator(maxPrazo: number) {
      return (control: AbstractControl): ValidationErrors | null => {
        const valor = parseInt(control.value, 10);
        if (isNaN(valor)) return null;
        return valor > maxPrazo ? { prazoMaximo: { max: maxPrazo } } : null;
      };
    }

    this.productsService.getApi().subscribe({
      next: (products) => {
        this.options = products.map((product: any) => ({
          label: product.title,
          value: product // guarda o objeto completo
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      }
    });

    // Habilita campos e aplica validações quando produto é selecionado
    this.simulationForm.get('product')?.valueChanges.subscribe((product) => {
      this.selectedProduct = product;

      if (product) {
        this.simulationForm.get('amount')?.enable();
        this.simulationForm.get('term')?.enable();
        this.simulationForm.get('term')?.setValidators([
          Validators.required,
          prazoMaximoValidator(product.term)
        ]);       
        this.simulationForm.get('term')?.updateValueAndValidity();
      } else {
        this.simulationForm.get('amount')?.disable();
        this.simulationForm.get('term')?.disable();
      }
    });
  }

  // Utiliza o serviço SimulatorService para simular o empréstimo e retornar os dados -> será implementado pelo Backend
  onSimulate(formData: any): void {
    this.resultadoSimulacao = this.simulatorService.simulateLoan(
      formData.product,
      formData.amount,
      formData.term
    );
  }

}
