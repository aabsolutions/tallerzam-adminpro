import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../../environments/environment';
import { CargarEmpleado } from '../interfaces/empleado.interface';
import { Empleado } from '../models/empleado.model';
import { CargarTipoDeEmpleados } from '../interfaces/tipo-empleado.interface';
import { TipoDeEmpleado } from '../models/tipo_empleado.model';
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

  // cargarEmpleadoPorId( id: string )
  // {
  //   const url = `${ base_url}/empleados/${ id }`;
  //   return this.http.get(url, this.headers )
  //     .pipe(
  //       map( (resp: {ok: boolean, empleado: Empleado}) => resp.empleado )   
  //     )
  // }

  // crearEmpleado( empleado: Empleado )
  // {
  //   const url = `${ base_url}/empleados`;
  //   return this.http.post(url, empleado , this.headers );
  // }

  // actualizarEmpleado( empleado: Empleado )
  // {
  //   const url = `${ base_url}/empleados/${empleado._id}`;
  //   return this.http.put(url, empleado, this.headers );
  // }

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


