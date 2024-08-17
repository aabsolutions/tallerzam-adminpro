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

@NgModule({
  declarations: [
    DashboardComponent,
    ProductoComponent,
    PagesComponent,
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
