import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

import { Cliente } from '../models/cliente.model';
import { Usuario } from '../models/usuario.model';
import { Producto } from '../models/producto.model';
import { Empleado } from '../models/empleado.model';
import { Proveedor } from '../models/proveedor.model';
import { Vehiculo } from '../models/vehiculo.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarClientes( resultados: any[]): Cliente[]{
    return resultados.map(
      //hay que tener presente el orden en el que se traen los datos desde el modelo
      cliente => new Cliente(cliente.tipo_cliente, cliente.cedula_ruc, cliente.apellidos_razon_social, cliente.nombres, cliente._id, cliente.ciudad,
        cliente.direccion, cliente.email, cliente.celular, cliente.img, cliente.usuario, cliente.estado)
      );
    }
    
    private transformarEmpleados( resultados: any[]): Empleado[]{
      return resultados.map(
        //hay que tener presente el orden en el que se traen los datos desde el modelo
        empleado => new Empleado(empleado.cedula, empleado.apellidos, empleado.nombres, empleado.tipo_empleado, empleado.f_nac, empleado.celular, empleado.email, 
          empleado.direccion, empleado._id, empleado.img, empleado.usuario, empleado.estado)
        );
      }
      
    private transformarProductos( resultados: any[]): Producto[]{
        return resultados.map(
          //hay que tener presente el orden en el que se traen los datos desde el modelo
          producto => new Producto(producto.matricula, producto.descripcion, producto.stock, producto.stock_minimo, producto.costo,
            producto.precio, producto.unidad, producto.tipo_repuesto, producto.proveedor, producto._id, producto.codigo, producto.modelo, producto.marca, 
            producto.procedencia, producto.img, producto.observacion, producto.usuario, producto.estado)
        );
      }
    
    private transformarProveedores( resultados: any[]): Proveedor[]{
      return resultados.map(
        //hay que tener presente el orden en el que se traen los datos desde el modelo
        proveedor => new Proveedor(proveedor.ruc, proveedor.razon_social, proveedor.direccion, proveedor.email, proveedor.celular, proveedor.telefono,
          proveedor.ciudad, proveedor.usuario, proveedor.estado, proveedor._id)
      );
    }
    
    private transformarUsuarios( resultados: any[]): Usuario[]{
      return resultados.map(
        user => new Usuario(user.nombre, user.email, '', user.img, user.role, user.uid)
      );
    }

    private transformarVehiculos( resultados: any[]): Vehiculo[]{
      return resultados.map(
        vehiculo => new Vehiculo(vehiculo.placa, vehiculo.vin, vehiculo.motor, vehiculo.modelo, vehiculo.propietario, vehiculo.tipo_vehiculo, vehiculo.anio,
          vehiculo.ramv, vehiculo.marca, vehiculo.cilindraje, vehiculo.clase_vehiculo, vehiculo.origen, vehiculo.combustible, vehiculo.carroceria,
          vehiculo.peso, vehiculo.tipo_peso, vehiculo.color, vehiculo.img, vehiculo.usuario, vehiculo.estado, vehiculo._id)
      );
    }

    buscarTodo(  termino: string){
    const url = `${base_url}/busqueda/${termino}`;
      return this.http.get(url, this.headers )
    }

    buscar( tipo: 'clientes'|'servicios'|'empleados'|'productos'|'proveedores'|'usuarios'|'vehiculos', termino: string){
      const url = `${base_url}/busqueda/${ tipo }/${termino}`;
      return this.http.get<any[]>(url, this.headers )
        .pipe( 
          //se debe tener cuidado en el nombre asignado en el backend para la respuesta 
          //de los datos y que los datos vengan tal como se los requiere sin filtro en el backend
          map( (resp: any) => {
            switch (tipo) {
              case 'clientes':
                return this.transformarClientes(resp.data);
              case 'empleados':
                return this.transformarEmpleados(resp.data);
              case 'productos':
                return this.transformarProductos(resp.data);
              case 'proveedores':
                  return this.transformarProveedores(resp.data);
              case 'usuarios':
                return this.transformarUsuarios(resp.data);
              case 'vehiculos':
                return this.transformarVehiculos(resp.data);
              default:
                return[];
            }
          }) 
        );
    }

}
