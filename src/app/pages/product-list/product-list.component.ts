import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DscTableColumn, DscTableColumnBuilder, DscTableComponent } from 'sidsc-components/dsc-table';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from 'src/app/services/products.service';

interface DataTable {
  title: string;
  tax: number;
  term: number;
  disabled?: boolean;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, DscTableComponent, MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  colunas!: DscTableColumn[];
  data!: DataTable[];
  selectedRows!: DataTable[];
  produtos: any[] = [];

  // Injeta o ProductService no componente
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    
    // HTTP Request GET para importar o banco de dados
    this.productsService.getApi().subscribe(data => {
      this.produtos = data;
      this.colunas = this.criaColunas();
      this.data = JSON.parse(JSON.stringify(this.produtos))
      this.selectedRows = [this.data[1], this.data[3]];

    });
  }

  // Criação da tabela usando o DscTableColumBuilder
   private criaColunas(): DscTableColumn[] {
    return [
      DscTableColumnBuilder.instance()
        .property('title')
        .title('Nome')
        .value((obj: DataTable) => obj.title)
        .build(),
      
      DscTableColumnBuilder.instance()
        .property('tax')
        .title('Taxa de juros anual')
        .value((obj: DataTable) => obj.tax.toFixed(2).replace('.', ',') + '%a.a') //mostra a taxa no formato 00,00%a.a
        .build(),

      DscTableColumnBuilder.instance()
        .property('term')
        .title('Prazo máximo')
        .value((obj: DataTable) => obj.term+" meses")
        .build(),
    ]
  }

}
