import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../../environments/environment';

import { CargarProveedor } from '../interfaces/proveedor.interface';

import { Proveedor } from '../models/proveedor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

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

  cargarProveedores(desde: number = 0, limite: number = 0)
  {
    const url = `${ base_url}/proveedores`;
    return this.http.get<CargarProveedor>(url, this.headers )
      .pipe(
        map( resp => {
          const proveedores = resp.proveedores.map(
            //hay que tener presente el orden en el que se traen los datos desde el modelo
            proveedor => new Proveedor(proveedor.ruc, proveedor.razon_social, proveedor.direccion, 
              proveedor.email, proveedor.celular, proveedor.telefono, proveedor.ciudad, proveedor.usuario,
            proveedor.estado, proveedor._id)
          );
          return {
            total: resp.total,
            proveedores
          };
          
        })
      )
  }

  cargarProveedorPorId( id: string )
  {
    const url = `${ base_url}/proveedores/${ id }`;
    return this.http.get(url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, proveedor: Proveedor}) => resp.proveedor )   
      )
  }

  crearProveedor( proveedor: Proveedor )
  {
    const url = `${ base_url}/proveedores`;
    return this.http.post(url, proveedor , this.headers );
  }

  actualizarProveedor( proveedor: Proveedor )
  {
    const url = `${ base_url}/proveedores/${proveedor._id}`;
    return this.http.put(url, proveedor, this.headers );
  }

}


