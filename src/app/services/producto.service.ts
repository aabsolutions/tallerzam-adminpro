import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../../environments/environment';

import { Producto } from '../models/producto.model';

import { CargarProducto } from '../interfaces/producto.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

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

  // cargarProductos(desde: number = 0, limite: number = 0)
  // {
  //   const url = `${ base_url}/productos?from=${desde}&limit=${limite}`;

  //   return this.http.get<CargarProducto>(url, this.headers )
  //     .pipe(
  //       map( resp => {
  //         const productos = resp.estudiantes.map(
  //           //hay que tener presente el orden en el que se traen los datos desde el modelo
  //           producto => new Producto(
  //           )
  //         );
  //         return {
  //           total: resp.total,
  //           productos
  //         };
  //       })
  //     )
  // }

  cargarProductoPorId( id: string )
  {
    const url = `${ base_url}/productos/${ id }`;
    return this.http.get(url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, producto: Producto}) => resp.producto )   
      )
  }

  // cargarMatriculaEstudiante( id: string )
  // {
  //   const url = `${ base_url}/estudiantes/matricula/${ id }`;
  //   return this.http.get(url, this.headers )
  //     .pipe(
  //       map( (resp: {ok: boolean, matricula: Matricula}) => resp.matricula[0] )   
  //     )
  // }

  crearProducto( producto: Producto )
  {
    const url = `${ base_url}/productos`;
    return this.http.post(url, producto , this.headers );
  }

  actualizarProducto( producto: Producto )
  {
    const url = `${ base_url}/productos/${producto._id}`;
    return this.http.put(url, producto, this.headers );
  }

  // asignarEstudianteCurso( idEstudiante: string, idCurso: string, idMatricula?:string)
  // {
  //   const url = `${ base_url}/estudiantes/asignacion/${idEstudiante}`;
  //   return this.http.put(url, { curso: idCurso, matricula: idMatricula} , this.headers );
  // }

  // registroEstudianteImc( estudiante: string, periodo: string, peso: number, talla: number, fecha_toma: string)
  // {
  //   const url = `${ base_url}/estudiantes/imc/${estudiante}`;
  //   return this.http.put(url, { periodo, peso, talla, fecha_toma } , this.headers );
  // }

  // eliminarCliente( _id: string )
  // {
  //   const url = `${ base_url}/clientes/${_id}`;
  //   return this.http.delete(url, this.headers );
  // }

}


