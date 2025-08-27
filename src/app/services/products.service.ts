import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // Serviço para conexão com o banco de dados
  
  private apiUrl = 'http://localhost:3000/products'; // URL do json-server -> necessário rodar o json-server na porta 3000 para a aplicação funcionar

  constructor(private http: HttpClient) {}

  // Função para baixar o banco de dados com HTTP GET
  getApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Função para adicionar novo produto no banco de dados com HTTP POST
 addProduct(title: string, tax: number, term: number): Observable<any> {
    const newProduct = {
      title,
      tax,
      term
    };
    return this.http.post<any>(this.apiUrl, newProduct);
  }

}
