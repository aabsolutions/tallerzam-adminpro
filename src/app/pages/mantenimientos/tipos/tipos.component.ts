import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { TipoService } from '../../../services/tipo.service';

import { Tipo } from '../../../models/tipo.model';


@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html'
})
export class TiposComponent implements OnInit, OnDestroy{

  public tipos: Tipo[] = [];
  public tiposTemp: Tipo[] = [];

  public desde: number = 0;
  public cargando: boolean = false;
  public imgSubs: Subscription;
  public nivelUsuario;

  public seleccionForm: FormGroup;

  constructor( private _tipoService: TipoService,
               private _busquedasSrv: BusquedasService,
               private _modalImagenSrv: ModalImagenService,
               private _usuarioService: UsuarioService,
               private fb: FormBuilder){}

  ngOnInit(): void {
    this.seleccionForm = this.fb.group({
      jornada: [ '0' , Validators.required ],
      nivel: [ '0', Validators.required ]
    });

    this.cargarTipos();

    this.nivelUsuario = this._usuarioService.role;
  }

  ngOnDestroy(): void {
  }

  cargarTipos(){
      this.cargando = true;

      this._tipoService.cargarTipos('empleado')
      .subscribe(
        ({total, tipos}) =>{
          this.tiposTemp = tipos;
          this.tipos = tipos;
          this.cargando = false;
        }) 
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

  // buscar(termino: string){

  //   if(termino.length === 0){
  //     return this.tipos = this.tiposTemp;
  //   }

  //   this._busquedasSrv.buscar('tipos', termino)
  //     .subscribe(
  //       (resp: Tipo[]) => {
  //         this.tipos = resp;
  //       });
  //     return true;
  // }

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
