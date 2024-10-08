import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { ModalImagenService } from '../../../services/modal-imagen.service';
import { EmpleadoService } from '../../../services/empleado.service';
import { Empleado } from '../../../models/empleado.model';
import { TipoService } from '../../../services/tipo.service';
import { Tipo } from '../../../models/tipo.model';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: [
  ]
})

export class EmpleadoComponent implements OnInit {

  public empleadoForm: FormGroup;
  public empleadoSeleccionado: Empleado;
  public imgSubs: Subscription;
  public usuarioRegistro: string;

  public tipos_empleado : Tipo[];

  constructor(private fb: FormBuilder,
              private _empleadoService: EmpleadoService,
              private _tiposService: TipoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({id}) => {
          if(id){
            this.cargarEmpleado(id);
          }
        } );

    this.empleadoForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      f_nac: [''],
      tipo_empleado: ['', Validators.required],
      celular: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      email: ['',Validators.email],
      direccion: [''],
    });

   this.cargarTipos('empleado');

  }

  cargarTipos(path: string){
    this._tiposService.cargarTipos(path)
    .subscribe(
      ({tipos}) =>{
        this.tipos_empleado = tipos;
      }) 
  }


  cargarEmpleado( id: string ){
    if(id === 'nuevo'){
      return;
    }

    this._empleadoService.cargarEmpleadoPorId(id)
        .subscribe( (empleado: Empleado) => {
          if( !empleado ){
            return this.router.navigateByUrl(`/dashboard/empleados/administracion`);
          }

          this.empleadoSeleccionado = empleado;

          this.empleadoForm.setValue({
            cedula: this.empleadoSeleccionado.cedula||'',
            apellidos: this.empleadoSeleccionado.apellidos||'',
            nombres: this.empleadoSeleccionado.nombres||'',
            f_nac: this.empleadoSeleccionado.f_nac||'',
            tipo_empleado: this.empleadoSeleccionado.tipo_empleado||'',
            celular: this.empleadoSeleccionado.celular||'',
            email: this.empleadoSeleccionado.email||'',
            direccion: this.empleadoSeleccionado.direccion||''
          });
          this.usuarioRegistro = this.empleadoSeleccionado.usuario.nombre;
          return true;
        }
      )
  }

  guardarEmpleado(){
    if(this.empleadoSeleccionado){

      const cid = this.empleadoSeleccionado._id;
      const data = {
        _id: cid,
        ...this.empleadoForm.value,
      }

      this._empleadoService.actualizarEmpleado(data)
        .subscribe(
          (resp: any) => {
            Swal.fire('Creado', `El empleado ha sido actualizado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/empleados/administracion`);
          },
          (err) => {
            Swal.fire('Error', err.error.msg, 'error' );
          }
        )
    }else{

      console.log(this.empleadoForm.value);

        this._empleadoService.crearEmpleado(this.empleadoForm.value)
        .subscribe(
          (resp: any) => {
            Swal.fire('Creado', `El empleado ha sido creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/empleados/administracion`);
          },
          (err) => {
            Swal.fire('Error', err.error.msg, 'error' );
          }
        )
      }    
    }
 
  // abrirModal(estudiante: Estudiante){
  //   this.modalImagenSrv.abrirModal('clientes',estudiante._id, estudiante.img_secure_url)
  // }
    

  
}
