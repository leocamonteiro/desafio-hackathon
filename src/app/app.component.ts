import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { DscHeaderComponent } from 'sidsc-components/dsc-header';
import { DscMenu, DscSidenavComponent } from 'sidsc-components/dsc-sidenav';
import { DscDialogModule, DscDialogService } from 'sidsc-components/dsc-dialog';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DscHeaderComponent, DscSidenavComponent, DscDialogModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-emprestimos';
  itemsMenu: DscMenu[] = []
  @ViewChild('sidenav') sidenav: DscSidenavComponent | undefined;


  
  ngOnInit(): void {

    // Inicialização dos itens do menu lateral:
    this.itemsMenu = [
      {
        title: "Início",
        url: "/",
        icon: "home",
        disabled: false
      },
      {
        title: "Cadastrar Produto",
        url: "/add-product",
        icon: "add",
        disabled: false
      },
      {
        title: "Listar Produtos",
        url: "/product-list",
        icon: "list",
        disabled: false
      },
      {
        title: "Simular Empréstimo",
        url: "/simulation",
        icon: "attach_money",
        disabled: false
      }
    ];
  }

    // Implementação do botão do header:
    public toggleMenu(ev: any): void {
      if (this.sidenav) this.sidenav.opened = !this.sidenav.opened;
    }


}
