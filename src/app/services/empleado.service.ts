import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../../environments/environment';

import { CargarEmpleado } from '../interfaces/empleado.interface';

import { Empleado } from '../models/empleado.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

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

  cargarEmpleados(desde: number = 0, limite: number = 0)
  {
    const url = `${ base_url}/empleados?from=${desde}&limit=${limite}`;
    return this.http.get<CargarEmpleado>(url, this.headers )
      .pipe(
        map( resp => {
          const empleados = resp.empleados.map(
            empleado => new Empleado(empleado.cedula, empleado.apellidos, empleado.nombres, empleado.tipo_empleado, empleado.f_nac, 
              empleado.celular, empleado.email, empleado.direccion, empleado._id, empleado.img, empleado.usuario, empleado.estado)
          );
          return {
            total: resp.total,
            empleados
          };
          
        })
      )
  }

  cargarEmpleadoPorId( id: string )
  {
    const url = `${ base_url}/empleados/${ id }`;
    return this.http.get(url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, empleado: Empleado}) => resp.empleado )   
      )
  }

  crearEmpleado( empleado: Empleado )
  {
    const url = `${ base_url}/empleados`;
    return this.http.post(url, empleado , this.headers );
  }

  actualizarEmpleado( empleado: Empleado )
  {
    const url = `${ base_url}/empleados/${empleado._id}`;
    return this.http.put(url, empleado, this.headers );
  }

}


