import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit, OnDestroy{

  public totalUsuarios: number;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = false;
  public imgSubs: Subscription;

  constructor( private usuService: UsuarioService,
               private busquedasSrv: BusquedasService,
               private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.imgSubs = this.modalImagenSrv.imagenCambio
      .pipe(
        delay(200)
      )
      .subscribe(img => this.cargarUsuarios());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe;
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuService.cargarUsuarios(this.desde)
      .subscribe(
        ({total, usuarios}) =>{
          this.totalUsuarios = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        })
  }

  cambiarPagina( valor: number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    }else if(this.desde > this.totalUsuarios){
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string){

    if(termino.length === 0){
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasSrv.buscar('usuarios', termino)
      .subscribe(
        (resp: Usuario[]) => {
          this.usuarios = resp;
        });
      return true;
  }

  eliminarUsuario(usuario: Usuario){

    if(usuario.uid===this.usuService.uid){
      return Swal.fire('Error', 'No puede borrarse a sí mismo','error');
    }

    Swal.fire({
      title: '¿Está seguro de eliminar el usuario?',
      text: `Está a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo!'
    }).then((result) => {
      if (result.value) {
        this.usuService.eliminarUsuario(usuario)
          .subscribe( resp => {
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado.',
              `${ usuario.nombre } fue eliminado corréctamente`,
              'success'
            )
          })  
      }
    })
    return true;
  }

  cambiarRole( usuario: Usuario){
    this.usuService.guardarUsuario(usuario)
      .subscribe(
        
      )
  }

  abrirModal(usuario: Usuario){
    this.modalImagenSrv.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
