import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../../environments/environment';

import { Proveedor } from '../models/proveedor.model';
import { CargarTipo } from '../interfaces/tipo.interface';
import { Tipo } from '../models/tipo.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TipoService {

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

  cargarTipos(path: string)
  {
    const url = `${ base_url }/tipos/${ path }`;
    return this.http.get<CargarTipo>(url, this.headers )
      .pipe(
        map( resp => {
          const tipos = resp.data.map(
            //hay que tener presente el orden en el que se traen los datos desde el modelo
            tipo => new Tipo(tipo.descripcion, tipo._id, tipo.usuario, tipo.estado)
          );
          return {
            total: resp.total,
            tipos
          };
        })
      )
  }

  cargarTipoPorId( id: string, path: string )
  {
    const url = `${ base_url}/tipos/${ path }/${ id }`;
    return this.http.get(url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, tipo: Tipo}) => resp.tipo )   
      )
  }

  crearTipo( tipo: Tipo, path: string )
  {
    const url = `${ base_url}/tipos/${path}`;
    return this.http.post(url, tipo , this.headers );
  }

  actualizarTipo( tipo: Tipo, path: string )
  {
    const url = `${ base_url}/empleados/${path}/${tipo._id}`;
    return this.http.put(url, tipo, this.headers );
  }

  // cargarProveedoresLista()
  // {
  //   const url = `${ base_url}/proveedores`;
  //   return this.http.get<CargarProveedores>(url, this.headers )
  //     .pipe(
        
  //       map( resp => {
  //         const tiposDeEmpleados = resp.tiposDeEmpleado.map(
  //           //hay que tener presente el orden en el que se traen los datos desde el modelo
  //           tipoDeEmpleado => new TipoDeEmpleado(tipoDeEmpleado.descripcion, tipoDeEmpleado._id, tipoDeEmpleado.usuario, tipoDeEmpleado.estado)
  //         );
  //         console.log(tiposDeEmpleados);
  //         return {
  //           total: resp.total,
  //           tiposDeEmpleados
  //         };
          
  //       })
  //     )
  // }

}


