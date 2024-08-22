import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { ModalImagenService } from '../../../services/modal-imagen.service';
import { ProveedorService } from '../../../services/proveedor.service';
import { Proveedor } from '../../../models/proveedor.model';



@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styles: [
  ]
})

export class ProveedorComponent implements OnInit {

  public proveedorForm: FormGroup;
  public proveedorSeleccionado: Proveedor;
  public imgSubs: Subscription;
  public usuarioRegistro: string;

  constructor(private fb: FormBuilder,
              private _proveedorService: ProveedorService,              
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({id}) => {
          if(id){
            this.cargarProveedor(id);
          }
        } );

    this.proveedorForm = this.fb.group({
      ruc: ['', Validators.required],
      razon_social: ['', Validators.required],
      direccion: ['', Validators.required],
      email: [''],
      celular: [''],
      telefono: [''],
      ciudad: ['' ]
    });
  }


  cargarProveedor( id: string ){
    if(id === 'nuevo'){
      return;
    }

    this._proveedorService.cargarProveedorPorId(id)
        .subscribe( (proveedor: Proveedor) => {
          if( !proveedor ){
            return this.router.navigateByUrl(`/dashboard/proveedores/administracion`);
          }

          this.proveedorSeleccionado = proveedor;

          this.proveedorForm.setValue({
            ruc: this.proveedorSeleccionado.ruc||'',
            razon_social: this.proveedorSeleccionado.razon_social||'',
            direccion: this.proveedorSeleccionado.direccion||'',
            email: this.proveedorSeleccionado.email||'',
            celular: this.proveedorSeleccionado.celular||'',
            telefono: this.proveedorSeleccionado.telefono||'',
            ciudad: this.proveedorSeleccionado.ciudad||''
          });
          this.usuarioRegistro = this.proveedorSeleccionado.usuario.nombre;
          return true;
        }
      )
  }

  guardarProveedor(){
    if(this.proveedorSeleccionado){

      const cid = this.proveedorSeleccionado._id;
      const data = {
        _id: cid,
        ...this.proveedorForm.value,        
      }

      this._proveedorService.actualizarProveedor(data)
        .subscribe(
          (resp: any) => {
            Swal.fire('Creado', `El proveedor ha sido actualizado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/proveedores/administracion`);
          },
          (err) => {
            Swal.fire('Error', err.error.msg, 'error' );
          }
        )
    }else{

      console.log(this.proveedorForm.value);

        this._proveedorService.crearProveedor(this.proveedorForm.value)
        .subscribe(
          (resp: any) => {
            Swal.fire('Creado', `El proveedor ha sido creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/proveedores/administracion`);
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
