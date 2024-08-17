import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';

import { Producto } from '../../../models/producto.model';

import { ModalImagenService } from '../../../services/modal-imagen.service';
import { ProductoService } from '../../../services/producto.service';

import Swal from 'sweetalert2';

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

  public tipos_repuesto: any[] = 
  [
    {
      id: '66bc1b94c5a6ba76068a81b3',
      descripcion: 'REPUESTO MECÁNICO'
    },
    {
      id: '66bc1ba1c5a6ba76068a81bd',
      descripcion: 'REPUESTO ELÉCTRICO'
    },
    {
      id: '66bc1ba9c5a6ba76068a81c1',
      descripcion: 'REPUESTO ELECTRÓNICO'
    }
  ]

  constructor(private fb: FormBuilder,
              private _productoService: ProductoService,
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
          console.log(producto.matricula);
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
            proveedor: this.productoSeleccionado.proveedor||'',
            stock: this.productoSeleccionado.stock||'',
            stock_minimo: this.productoSeleccionado.stock_minimo||'',
            tipo_repuesto: this.productoSeleccionado.tipo_repuesto||'',
            unidad: this.productoSeleccionado.unidad||''
          });       
          return true;
        }
      )
  }

  // guardarCurso(){

  //   const { 
  //       grado,
  //       nivel,
  //       paralelo,
  //       jornada,
  //       especialidad 
  //   } = this.cursoForm.value;

  //   var grado_abrev = ''
  //   //enum: ['8VO', '9NO', '10MO', '1ER BACH.', '2DO BACH.', '3ER BACH.'],
  //   switch (grado) {
  //     case '8VO GRADO':
  //       grado_abrev = '8VO'
  //       break;
  //     case '9NO GRADO':
  //       grado_abrev = '9NO'
  //       break;
  //     case '10MO GRADO':
  //       grado_abrev = '10MO'
  //       break;
  //     case '1ER CURSO':
  //       grado_abrev = '1ER BACH.'
  //       break;
  //     case '2DO CURSO':
  //       grado_abrev = '2DO BACH.'
  //       break;
  //     case '3ER CURSO':
  //       grado_abrev = '3ER BACH.'
  //       break;
  //   }

  //   var nivel_abrev = ''

  //   switch (nivel) {
  //     case 'EGB SUPERIOR':
  //       nivel_abrev = 'EGB SUP.'
  //       break;
  //     case 'BACHILLERATO GENERAL UNIFICADO':
  //       nivel_abrev = 'BGU'
  //       break;
  //     case 'BACHILLERATO TECNICO':
  //       nivel_abrev = 'BT'
  //       break;
  //   }

  //   if(this.cursoSeleccionado){
  //     const cid = this.cursoSeleccionado._id;
  //     const data = {
  //       _id: cid,
  //       grado_abrev,
  //       nivel_abrev,
  //       ...this.cursoForm.value,        
  //     }
  
  //     this.cursoService.actualizarCurso(data)
  //         .subscribe(
  //           resp => {
  //             Swal.fire('Actualizado', `El curso ha sido actualizado correctamente`, 'success');
  //             this.router.navigateByUrl(`/dashboard/cursos`);
  //           }
  //         )
  //   }else{
 
  //   const data = {
  //     grado_abrev,
  //     nivel_abrev,
  //     ...this.cursoForm.value        
  //   }

  //   this.cursoService.crearCurso(data)
  //     .subscribe(
  //       (resp: any) => {
  //         Swal.fire('Creado', `El curso ha sido creado correctamente`, 'success');
  //         this.router.navigateByUrl(`/dashboard/cursos`);
  //       },
  //       (err) => {
  //         Swal.fire('Error', err.error.msg, 'error' );
  //       }
  //     )
  //   }    
  // }

  // abrirModal(estudiante: Estudiante){
  //   this.modalImagenSrv.abrirModal('clientes',estudiante._id, estudiante.img_secure_url)
  // }
    

  
}
