import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../../environments/environment';
import { CargarCliente } from '../interfaces/cliente.interface';
import { Cliente } from '../models/cliente.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }
  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
        headers:{
        'x-token': this.token
      }
    }
  }

  cargarClientes(desde: number = 0, limite: number = 0)
  {
    const url = `${ base_url}/clientes?from=${desde}&limit=${limite}`;
    return this.http.get<CargarCliente>(url, this.headers )
      .pipe(
        map( resp => {
          const clientes = resp.clientes.map(
            //hay que tener presente el orden en el que se traen los datos desde el modelo
            cliente => new Cliente(cliente.tipo_cliente, cliente.cedula_ruc, cliente.apellidos_razon_social, cliente.nombres, cliente._id, cliente.ciudad,
              cliente.direccion, cliente.email, cliente.celular, cliente.img, cliente.usuario, cliente.estado)
          );
          return {
            total: resp.total,
            clientes
          };
          
        })
      )
  }

  cargarClientePorId( id: string )
  {
    const url = `${ base_url}/clientes/${ id }`;
    return this.http.get(url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, cliente: Cliente}) => resp.cliente )   
      )
  }

  crearCliente( cliente: Cliente )
  {
    const url = `${ base_url}/clientes`;
    return this.http.post(url, cliente , this.headers );
  }

  actualizarCliente( cliente: Cliente )
  {
    const url = `${ base_url}/clientes/${cliente._id}`;
    return this.http.put(url, cliente, this.headers );
  }

}


