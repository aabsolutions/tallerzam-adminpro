import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ProveedorService } from '../../../services/proveedor.service';

import { Proveedor } from '../../../models/proveedor.model';


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html'
})
export class ProveedoresComponent implements OnInit, OnDestroy{

  public proveedores: Proveedor[] = [];
  public proveedoresTemp: Proveedor[] = [];

  public desde: number = 0;
  public cargando: boolean = false;
  public imgSubs: Subscription;
  public nivelUsuario;

  public seleccionForm: FormGroup;

  constructor( private _proveedorService: ProveedorService,
               private _busquedasSrv: BusquedasService,
               private _modalImagenSrv: ModalImagenService,
               private _usuarioService: UsuarioService,
               private fb: FormBuilder){}

  ngOnInit(): void {
    this.seleccionForm = this.fb.group({
      jornada: [ '0' , Validators.required ],
      nivel: [ '0', Validators.required ]
    });

    this.cargarProveedores();

    this.nivelUsuario = this._usuarioService.role;
  }

  ngOnDestroy(): void {
  }

  cargarProveedores(){
      this.cargando = true;
      this._proveedorService.cargarProveedores()
      .subscribe(
        ({total, proveedores}) =>{
          this.proveedoresTemp = proveedores;
          this.proveedores = proveedores;
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

  buscar(termino: string){

    if(termino.length === 0){
      return this.proveedores = this.proveedoresTemp;
    }

    this._busquedasSrv.buscar('proveedores', termino)
      .subscribe(
        (resp: Proveedor[]) => {
          this.proveedores = resp;
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
