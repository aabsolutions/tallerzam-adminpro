import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductoComponent } from './mantenimientos/productos/producto.component';

import { AdminGuard } from '../guards/admin.guard';
import { RegistroComponent } from './mantenimientos/usuarios/registro.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { ClientesComponent } from './mantenimientos/clientes/clientes.component';
import { ClienteComponent } from './mantenimientos/clientes/cliente.component';
import { EmpleadosComponent } from './mantenimientos/empleados/empleados.component';
import { EmpleadoComponent } from './mantenimientos/empleados/empleado.component';
import { ProveedorComponent } from './mantenimientos/proveedores/proveedor.component';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { VehiculosComponent } from './mantenimientos/vehiculos/vehiculos.component';
import { VehiculoComponent } from './mantenimientos/vehiculos/vehiculo.component';
import { TiposComponent } from './mantenimientos/tipos/tipos.component';
import { TipoComponent } from './mantenimientos/tipos/tipo.component';

const childRoutes: Routes = [
  { path:'', component: DashboardComponent, data: { principal: 'Personal', titulo: 'Dashboard' }, },
  
  { path:'registro', canActivate: [AdminGuard], component: RegistroComponent, data: { principal: 'Personal', titulo: 'Registro de usuarios' } },
  { path:'usuarios', component: UsuariosComponent, data: { principal: 'Personal', titulo: 'Administración de usuarios' } },

  
  { path:'clientes/administracion', component: ClientesComponent, data: { principal: 'Clientes', titulo: 'Administración de clientes' } },
  { path:'clientes/:id', canActivate: [AdminGuard], component: ClienteComponent, data: { principal: 'Clientes', titulo: 'Información de clientes' } },
  
  { path:'empleados/administracion', component: EmpleadosComponent, data: { principal: 'Empleados', titulo: 'Administración de empleados' } },
  { path:'empleados/:id', canActivate: [AdminGuard], component: EmpleadoComponent, data: { principal: 'Empleados', titulo: 'Información de empleados' } },
  
  { path:'productos/administracion', component: ProductosComponent, data: { principal: 'Productos', titulo: 'Administración de productos' } },
  { path:'productos/:id', canActivate: [AdminGuard], component: ProductoComponent, data: { principal: 'Productos', titulo: 'Información de producto' } },

  { path:'proveedores/administracion', component: ProveedoresComponent, data: { principal: 'Proveedores', titulo: 'Administración de proveedores' } },
  { path:'proveedores/:id', canActivate: [AdminGuard], component: ProveedorComponent, data: { principal: 'Proveedores', titulo: 'Información de proveedor' } },

  { path:'tipos/administracion', component: TiposComponent, data: { principal: 'Tipos', titulo: 'Administración de tipos' } },
  { path:'tipos/:id', canActivate: [AdminGuard], component: TipoComponent, data: { principal: 'Tipos', titulo: 'Información de tipo' } },

  { path:'vehiculos/administracion', component: VehiculosComponent, data: { principal: 'Vehículos', titulo: 'Administración de vehículos' } },
  { path:'vehiculos/:id', canActivate: [AdminGuard], component: VehiculoComponent, data: { principal: 'Vehículos', titulo: 'Información de vehículo' } },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { 


}
