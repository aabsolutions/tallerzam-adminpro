import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { ProductoComponent } from './mantenimientos/productos/producto.component';
import { RegistroComponent } from './mantenimientos/usuarios/registro.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { ClienteComponent } from './mantenimientos/clientes/cliente.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { EmpleadoComponent } from './mantenimientos/empleados/empleado.component';
import { EmpleadosComponent } from './mantenimientos/empleados/empleados.component';
import { ProveedorComponent } from './mantenimientos/proveedores/proveedor.component';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { VehiculoComponent } from './mantenimientos/vehiculos/vehiculo.component';
import { VehiculosComponent } from './mantenimientos/vehiculos/vehiculos.component';
import { TipoComponent } from './mantenimientos/tipos/tipo.component';
import { TiposComponent } from './mantenimientos/tipos/tipos.component';

@NgModule({
  declarations: [
    ClienteComponent,
    ClientesComponent,
    DashboardComponent,
    EmpleadoComponent,
    EmpleadosComponent,
    PagesComponent,
    ProductoComponent,
    ProductosComponent,
    ProveedorComponent,
    ProveedoresComponent,
    RegistroComponent,
    TipoComponent,
    TiposComponent,
    UsuariosComponent,
    VehiculoComponent, 
    VehiculosComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,   
  ]
})
export class PagesModule { }
