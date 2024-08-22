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

  cargarProductos(desde: number = 0, limite: number = 0)
  {
    const url = `${ base_url}/productos?from=${desde}&limit=${limite}`;
    return this.http.get<CargarProducto>(url, this.headers )
      .pipe(
        map( resp => {
          const productos = resp.productos.map(
            producto => new Producto(producto.matricula, producto.descripcion, producto.stock, producto.stock_minimo, producto.costo,
              producto.precio, producto.unidad, producto.tipo_repuesto, producto.proveedor, producto._id, producto.codigo, producto.modelo, producto.marca, 
              producto.procedencia, producto.img, producto.observacion, producto.usuario, producto.estado)
          );
          return {
            total: resp.total,
            productos
          };
          
        })
      )
  }

  cargarProductoPorId( id: string )
  {
    const url = `${ base_url}/productos/${ id }`;
    return this.http.get(url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, producto: Producto}) => resp.producto )   
      )
  }

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

}


