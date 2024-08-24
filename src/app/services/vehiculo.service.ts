import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../../environments/environment';

import { CargarVehiculo } from '../interfaces/vehiculo.interface';

import { Vehiculo } from '../models/vehiculo.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

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

  cargarVehiculos(desde: number = 0, limite: number = 0)
  {
    const url = `${ base_url}/vehiculos?from=${desde}&limit=${limite}`;
    return this.http.get<CargarVehiculo>(url, this.headers )
      .pipe(
        map( resp => {
          const vehiculos = resp.vehiculos.map(
            vehiculo => new Vehiculo(vehiculo.placa, vehiculo.vin, vehiculo.motor, vehiculo.modelo, vehiculo.propietario, vehiculo.tipo_vehiculo, vehiculo.anio,
              vehiculo.ramv, vehiculo.marca, vehiculo.cilindraje, vehiculo.clase_vehiculo, vehiculo.origen, vehiculo.combustible, vehiculo.carroceria,
              vehiculo.peso, vehiculo.tipo_peso, vehiculo.color, vehiculo.img, vehiculo.usuario, vehiculo.estado, vehiculo._id)
          );
          return {
            total: resp.total,
            vehiculos
          };
          
        })
      )
  }

  cargarVehiculoPorId( id: string )
  {
    const url = `${ base_url}/vehiculos/${ id }`;
    return this.http.get(url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, vehiculo: Vehiculo}) => resp.vehiculo )   
      )
  }

  crearVehiculo( vehiculo: Vehiculo )
  {
    const url = `${ base_url}/vehiculos`;
    return this.http.post(url, vehiculo , this.headers );
  }

  actualizarVehiculo( vehiculo: Vehiculo )
  {
    const url = `${ base_url}/vehiculos/${vehiculo._id}`;
    return this.http.put(url, vehiculo, this.headers );
  }

}


