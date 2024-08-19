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

const childRoutes: Routes = [
  { path:'', component: DashboardComponent, data: { principal: 'Personal', titulo: 'Dashboard' }, },
  
  { path:'registro', component: RegistroComponent, data: { principal: 'Personal', titulo: 'Registro de usuarios' } },
  { path:'usuarios', component: UsuariosComponent, data: { principal: 'Personal', titulo: 'Administración de usuarios' } },

  { path:'productos/administracion', component: ProductosComponent, data: { principal: 'Productos', titulo: 'Administración de productos' } },
  { path:'productos/:id', component: ProductoComponent, data: { principal: 'Productos', titulo: 'Información de producto' } },

  { path:'clientes/administracion', component: ClientesComponent, data: { principal: 'Clientes', titulo: 'Administración de clientes' } },
  { path:'clientes/:id', component: ClienteComponent, data: { principal: 'Clientes', titulo: 'Información de clientes' } },

]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { 


}
