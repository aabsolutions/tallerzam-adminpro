import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { BusquedasService } from '../../../services/busquedas.service';
import { ProductoService } from '../../../services/producto.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';

import { Producto } from '../../../models/producto.model';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit, OnDestroy{

  public totalCursos: number;
  public productos: Producto[] = [];
  public productosTemp: Producto[] = [];

  public desde: number = 0;
  public cargando: boolean = false;
  public imgSubs: Subscription;
  public niveles: string[] = ['EGB SUPERIOR', 'BACHILLERATO GENERAL UNIFICADO', 'BACHILLERATO TECNICO'];
  public nivelUsuario;

  public seleccionForm: FormGroup;

  constructor( private _productoService: ProductoService,
               private busquedasSrv: BusquedasService,
               private modalImagenSrv: ModalImagenService,
               private usuarioService: UsuarioService,
               private fb: FormBuilder){}

  ngOnInit(): void {
    this.seleccionForm = this.fb.group({
      jornada: [ '0' , Validators.required ],
      nivel: [ '0', Validators.required ]
    });

    this.cargarProductos();

    this.nivelUsuario = this.usuarioService.role;
  }

  ngOnDestroy(): void {
  }

  cargarProductos(){
    // const jornada = this.seleccionForm.get('jornada').value;
    // const nivel = this.seleccionForm.get('nivel').value;
    // if(jornada>0 && nivel>0){
      this.cargando = true;
      this._productoService.cargarProductos()
      .subscribe(
        ({total, productos}) =>{
          this.productosTemp = productos;
          this.productos = productos;
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
      return this.productos = this.productosTemp;
    }

    this.busquedasSrv.buscar('productos', termino)
      .subscribe(
        (resp: Producto[]) => {
          console.log(termino);
          this.productos = resp;
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
