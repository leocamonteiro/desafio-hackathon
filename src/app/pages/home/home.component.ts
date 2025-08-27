import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DscCardComponent } from 'sidsc-components/dsc-card';
import { Router } from '@angular/router';
import { DscButtonComponent } from 'sidsc-components/dsc-button';
import { DscDialogModule, DscDialogService } from 'sidsc-components/dsc-dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DscCardComponent, DscDialogModule, DscButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  retorno?: String;

  constructor(
    private router: Router,
    private _dialogService: DscDialogService
  ) {}
  
  // Altera a rota do componente principal de acordo com o botão clicado
  cardClicked(path: string) {
    this.router.navigate([path]);
  }

  // Implementação do DIALOG para mostrar os créditos do projeto
  abrirDialogNeutral(): void {
    this._dialogService.confirm({
      data: {
        title: {
          text: 'Desafio Hackathon 2025 - Dev Front-end',
          showCloseButton: true
        },
        message: `Criado por: Leonardo Monteiro (c124851)`,
        actionButton: {
          type: 'button',
          confirmText: 'OK',
          confirmFunction: () => {
            this.retorno = 'Dialog neutral confirmado!';
          }
        }
      }
    });
  }
  
  // Ao inicializar, mostra o DIALOG de créditos uma vez
  ngOnInit(): void {
    const dialogShown = sessionStorage.getItem('dialogNeutralShown');
  
    if (!dialogShown) {
      this.abrirDialogNeutral();
      sessionStorage.setItem('dialogNeutralShown', 'true');
    }
  }
  

}
