import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductoComponent } from './mantenimientos/productos/producto.component';

import { AdminGuard } from '../guards/admin.guard';
import { RegistroComponent } from './mantenimientos/usuarios/registro.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const childRoutes: Routes = [
  { path:'', component: DashboardComponent, data: { principal: 'Personal', titulo: 'Dashboard' }, },
  
  { path:'registro', component: RegistroComponent, data: { principal: 'Personal', titulo: 'Registro de usuarios' } },
  { path:'usuarios', component: UsuariosComponent, data: { principal: 'Personal', titulo: 'Administración de usuarios' } },

  { path:'productos/:id', component: ProductoComponent, data: { principal: 'Productos', titulo: 'Información de producto' } },


  
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { 


}
