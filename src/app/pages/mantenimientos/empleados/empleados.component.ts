import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { EmpleadoService } from '../../../services/empleado.service';

import { Empleado } from '../../../models/empleado.model';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html'
})
export class EmpleadosComponent implements OnInit, OnDestroy{

  public empleados: Empleado[] = [];
  public empleadosTemp: Empleado[] = [];

  public desde: number = 0;
  public cargando: boolean = false;
  public imgSubs: Subscription;
  public nivelUsuario;

  public seleccionForm: FormGroup;

  constructor( private _empleadoService: EmpleadoService,
               private _busquedasSrv: BusquedasService,
               private _modalImagenSrv: ModalImagenService,
               private _usuarioService: UsuarioService,
               private fb: FormBuilder){}

  ngOnInit(): void {
    this.seleccionForm = this.fb.group({
      jornada: [ '0' , Validators.required ],
      nivel: [ '0', Validators.required ]
    });

    this.cargarEmpleados();

    this.nivelUsuario = this._usuarioService.role;
  }

  ngOnDestroy(): void {
  }

  cargarEmpleados(){
    // const jornada = this.seleccionForm.get('jornada').value;
    // const nivel = this.seleccionForm.get('nivel').value;
    // if(jornada>0 && nivel>0){
      this.cargando = true;
      this._empleadoService.cargarEmpleados()
      .subscribe(
        ({total, empleados}) =>{
          this.empleadosTemp = empleados;
          this.empleados = empleados;
          this.cargando = false;
        }) 
    // }else{
    //   this.cursos = [];
    // }
  }

  // cambiarPagina( valor: number){
  //   this.desde += valor;

  //   if(this.desde < 0){
  //     this.desde = 0
  //   }else if(this.desde > this.totalCursos){
  //     this.desde -= valor;
  //   }
  //   this.cargarCursos();
  // }

  cambiaJornada(){
    // this.seleccionForm.controls['nivel'].setValue(0);
    // this.cursos = [];
  }

  buscar(termino: string){

    if(termino.length === 0){
      return this.empleados = this.empleadosTemp;
    }

    this._busquedasSrv.buscar('empleados', termino)
      .subscribe(
        (resp: Empleado[]) => {
          this.empleados = resp;
        });
      return true;
  }

  // eliminarUsuario(usuario: Usuario){

  //   Swal.fire({
  //     title: '¿Está seguro de eliminar el curso?',
  //     text: `Está a punto de borrar el curso`,
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Sí, elimínalo!'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.cursoService.elimi(usuario)
  //         .subscribe( resp => {
  //           this.cargarCursos();
  //           Swal.fire(
  //             'Usuario borrado.',
  //             `${ usuario.nombre } fue eliminado corréctamente`,
  //             'success'
  //           )
  //         })  
  //     }
  //   })
  //   return true;
  // }

  // abrirModal(usuario: Usuario){
  //   this.modalImagenSrv.abrirModal('usuarios', usuario.uid, usuario.img);
  // }
}
