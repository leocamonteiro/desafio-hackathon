import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DscInputComponent } from 'sidsc-components/dsc-input';
import { DscCardComponent } from 'sidsc-components/dsc-card';
import { DscButtonComponent } from 'sidsc-components/dsc-button';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DscInputCurrencyComponent } from 'sidsc-components/dsc-input-currency';
import { DscValidators } from 'sidsc-components/core';
import { DscAlertComponent } from 'sidsc-components/dsc-alert';



@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, DscInputComponent, DscCardComponent, DscButtonComponent, ReactiveFormsModule, DscInputCurrencyComponent, DscAlertComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  showAlert: boolean = false;

  // Injeta o FormBuilder e ProductsService no componente
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}



  ngOnInit(): void {

    // Inicialização do Formulário reativo productForm com a biblioteca Validators do Angular
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      tax: [null, [Validators.required, DscValidators.max(99.99)]],
      term: ['', Validators.required]
    });
  }

  onSubmit(): void {

    // Validação do Formulário
    if (this.productForm.valid) {
      const { title, tax, term } = this.productForm.value;
 
      // Chama a função addProduct injetada do ProductService
      this.productsService.addProduct(title, tax, term).subscribe({
        next: (response) => {
          this.productForm.reset();
          this.showAlert = true; // Mostra o Alert Success
          setTimeout(() => {
            this.showAlert = false;
          }, 3000); // Esconde o Alert Sucess após 3 segundos

        },
        error: (err) => {
          console.error('Erro ao adicionar produto:', err);
        }
      });
    }
  }

}
