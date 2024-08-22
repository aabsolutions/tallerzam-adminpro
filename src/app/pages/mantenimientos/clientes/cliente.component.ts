import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { ModalImagenService } from '../../../services/modal-imagen.service';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente.model';
import { CargarTipoDeCliente } from '../../../interfaces/tipo-cliente.interface';
import { TipoDeCliente } from '../../../models/tipo_cliente.model';
import { TipoService } from '../../../services/tipo.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [
  ]
})

export class ClienteComponent implements OnInit {

  public clienteForm: FormGroup;
  public clienteSeleccionado: Cliente;
  public imgSubs: Subscription;
  public usuarioRegistro: string;

  public tipos_clientes: TipoDeCliente[];

  constructor(private fb: FormBuilder,
              private _clienteService: ClienteService,
              private _tiposService: TipoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({id}) => {
          if(id){
            this.cargarCliente(id);
          }
        } );

    this.clienteForm = this.fb.group({
      tipo_cliente: ['', Validators.required],
      cedula_ruc: ['', Validators.required],
      apellidos_razon_social: ['', Validators.required],
      nombres: ['', Validators.required],
      ciudad: ['' ],
      direccion: [''],
      email: [''],
      celular: ['', Validators.required]
    });

    this.cargarTipos('cliente');

  }

  cargarTipos(path: string){
      this._tiposService.cargarTipos(path)
      .subscribe(
        ({tipos}) =>{
          this.tipos_clientes = tipos;
        }) 
  }

  cargarCliente( id: string ){
    if(id === 'nuevo'){
      return;
    }

    this._clienteService.cargarClientePorId(id)
        .subscribe( (cliente: Cliente) => {
          if( !cliente ){
            return this.router.navigateByUrl(`/dashboard/clientes/administracion`);
          }

          this.clienteSeleccionado = cliente;

          this.clienteForm.setValue({
            tipo_cliente: this.clienteSeleccionado.tipo_cliente||'',
            cedula_ruc: this.clienteSeleccionado.cedula_ruc||'',
            apellidos_razon_social: this.clienteSeleccionado.apellidos_razon_social||'',
            nombres: this.clienteSeleccionado.nombres||'',
            ciudad: this.clienteSeleccionado.ciudad||'',
            direccion: this.clienteSeleccionado.direccion||'',
            email: this.clienteSeleccionado.email||'',
            celular: this.clienteSeleccionado.celular||''
          });
          this.usuarioRegistro = this.clienteSeleccionado.usuario.nombre;
          return true;
        }
      )
  }

  guardarCliente(){
    if(this.clienteSeleccionado){

      const cid = this.clienteSeleccionado._id;
      const data = {
        _id: cid,
        ...this.clienteForm.value,        
      }

      this._clienteService.actualizarCliente(data)
        .subscribe(
          (resp: any) => {
            Swal.fire('Creado', `El cliente ha sido actualizado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/clientes/administracion`);
          },
          (err) => {
            Swal.fire('Error', err.error.msg, 'error' );
          }
        )
    }else{

      console.log(this.clienteForm.value);

        this._clienteService.crearCliente(this.clienteForm.value)
        .subscribe(
          (resp: any) => {
            Swal.fire('Creado', `El cliente ha sido creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/clientes/administracion`);
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
