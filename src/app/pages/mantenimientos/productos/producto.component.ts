import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';

import { Producto } from '../../../models/producto.model';

import { ModalImagenService } from '../../../services/modal-imagen.service';
import { ProductoService } from '../../../services/producto.service';

import Swal from 'sweetalert2';
import { TipoDeRepuesto } from '../../../models/tipo_repuesto.model';
import { Proveedor } from '../../../models/proveedor.model';
import { ProveedorService } from '../../../services/proveedor.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [
  ]
})

export class ProductoComponent implements OnInit {

  public productoForm: FormGroup;
  public productoSeleccionado: Producto;
  public imgSubs: Subscription;
  public usuarioRegistro: string;

  public tipos_repuesto: TipoDeRepuesto[];
  
  public proveedores: Proveedor[];

  constructor(private fb: FormBuilder,
              private _productoService: ProductoService,
              private _proveedorService: ProveedorService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({id}) => {
          if(id){
            this.cargarProducto(id);
          }
        } );

    this.productoForm = this.fb.group({
      codigo: [''],
      costo: ['', Validators.required],
      descripcion: ['', Validators.required],
      img: [''],
      marca: [''],
      matricula: ['', Validators.required],
      modelo: [''],
      observacion: [''],
      precio: ['', Validators.required],
      procedencia: [''],
      proveedor: ['', Validators.required],
      stock: ['', Validators.required],
      stock_minimo: ['', Validators.required],
      tipo_repuesto: ['', Validators.required],
      unidad: ['', Validators.required]
    });

    this.cargarTiposDeRepuesto();
    this.cargarProveedores();
    
  }

  cargarProducto( id: string ){
    if(id === 'nuevo'){
      return;
    }

    this._productoService.cargarProductoPorId(id)
        .subscribe( (producto: Producto) => {
          if( !producto ){
            return this.router.navigateByUrl(`/dashboard`);
          }

          this.productoSeleccionado = producto;

          this.productoForm.setValue({
            codigo: this.productoSeleccionado.codigo||'',
            costo: this.productoSeleccionado.costo||'',
            descripcion: this.productoSeleccionado.descripcion||'',
            img: this.productoSeleccionado.img||'',
            marca: this.productoSeleccionado.marca||'',
            matricula: this.productoSeleccionado.matricula||'',
            modelo: this.productoSeleccionado.modelo||'',
            observacion: this.productoSeleccionado.observacion||'',
            precio: this.productoSeleccionado.precio||'',
            procedencia: this.productoSeleccionado.procedencia||'',
            proveedor: this.productoSeleccionado.proveedor._id||'',
            stock: this.productoSeleccionado.stock||'',
            stock_minimo: this.productoSeleccionado.stock_minimo||'',
            tipo_repuesto: this.productoSeleccionado.tipo_repuesto||'',
            unidad: this.productoSeleccionado.unidad||''
          });
          this.usuarioRegistro = this.productoSeleccionado.usuario.nombre;
          return true;
        }
      )
  }

  cargarTiposDeRepuesto(){
    this._productoService.cargarTiposDeRepuesto()
    .subscribe(
      ({tiposDeRepuesto}) =>{
        this.tipos_repuesto = tiposDeRepuesto;
      }) 
  }

  cargarProveedores(){
    this._proveedorService.cargarProveedores()
    .subscribe(
      ({proveedores}) =>{
        this.proveedores = proveedores;
      }) 
  }

  guardarProducto(){
    if(this.productoSeleccionado){
      const pid = this.productoSeleccionado._id;
      const data = {
        _id: pid,
        ...this.productoForm.value,        
      }

      console.log(data);

      this._productoService.actualizarProducto(data)
        .subscribe(
          (resp: any) => {
            Swal.fire('Creado', `El producto ha sido actualizado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/productos/administracion`);
          },
          (err) => {
            Swal.fire('Error', err.error.msg, 'error' );
          }
        )
    }else{

        this._productoService.crearProducto(this.productoForm.value)
        .subscribe(
          (resp: any) => {
            Swal.fire('Creado', `El producto ha sido creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/productos/administracion`);
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
