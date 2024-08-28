import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { ModalImagenService } from '../../../services/modal-imagen.service';
import { TipoService } from '../../../services/tipo.service';
import { Tipo } from '../../../models/tipo.model';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styles: [
  ]
})

export class TipoComponent implements OnInit {

  public tipoForm: FormGroup;
  public tipoSeleccionado: Tipo;
  public pathSeleccionado: string;
  public imgSubs: Subscription;
  public usuarioRegistro: string;

  public tipo_tipos: any = [
    {
      path: 'cliente',
      descripcion: 'Clientes'
    },
    {
      path: 'empleado',
      descripcion: 'Empleados'
    },
    {
      path: 'repuesto',
      descripcion: 'Repuestos'
    },
    {
      path: 'servicio',
      descripcion: 'Servicios'
    },
    {
      path: 'vehiculo',
      descripcion: 'Vehiculos'
    }
  ];  
  
  constructor(private fb: FormBuilder,
              private _tipoService: TipoService,
              private _tiposService: TipoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({id, path}) => {
          if(id){
            this.pathSeleccionado = path;
            this.cargarTipo(id);
          }
        } );

    this.tipoForm = this.fb.group({
      tipo: [{value: '', disabled: false}, Validators.required],
      descripcion: ['', Validators.required],
    });

  }

  cargarTipo( id: string ){
    if(id === 'nuevo'){
      return;
    }

      this._tipoService.cargarTipoPorId(id, this.pathSeleccionado)
        .subscribe( (tipo: Tipo) => {
          this.tipoSeleccionado = tipo;
          this.tipoForm.setValue({
            descripcion: this.tipoSeleccionado.descripcion||'',
            tipo: this.pathSeleccionado||''
          });
          this.usuarioRegistro = this.tipoSeleccionado.usuario.nombre;
          this.tipoForm.get('tipo').disable();
          return true;
        }
      )
  }

  guardarTipo(){
    const path = this.tipoForm.get('tipo').value;
    if(this.tipoSeleccionado){

      const cid = this.tipoSeleccionado._id;
      const data = {
        _id: cid,
        ...this.tipoForm.value,        
      }


      this._tipoService.actualizarTipo(data, path)
        .subscribe(
          (resp: any) => {
            Swal.fire('Creado', `El tipo ha sido actualizado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/tipos/administracion`);
          },
          (err) => {
            Swal.fire('Error', err.error.msg, 'error' );
          }
        )
    }else{

      console.log(this.tipoForm.value);

        this._tipoService.crearTipo(this.tipoForm.value, path)
        .subscribe(
          (resp: any) => {
            Swal.fire('Creado', `El tipo ha sido creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/tipos/administracion`);
          },
          (err) => {
            Swal.fire('Error', err.error.msg, 'error' );
          }
        )
      }    
    }
 
  // abrirModal(estudiante: Estudiante){
  //   this.modalImagenSrv.abrirModal('tipos',estudiante._id, estudiante.img_secure_url)
  // }
    

  
}
