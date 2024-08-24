import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { ModalImagenService } from '../../../services/modal-imagen.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { Vehiculo } from '../../../models/vehiculo.model';
import { Tipo } from '../../../models/tipo';
import { TipoService } from '../../../services/tipo.service';


@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styles: [
  ]
})

export class VehiculoComponent implements OnInit {

  public vehiculoForm: FormGroup;
  public vehiculoSeleccionado: Vehiculo;
  public imgSubs: Subscription;
  public usuarioRegistro: string;

  public tipos_vehiculos: Tipo[];

  constructor(private fb: FormBuilder,
              private _vehiculoService: VehiculoService,
              private _tiposService: TipoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalImagenSrv: ModalImagenService){}

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({id}) => {
          if(id){
            this.cargarVehiculo(id);
          }
        } );

    this.vehiculoForm = this.fb.group({
      placa: ['', Validators.required],
      vin: ['', Validators.required],
      motor: ['', Validators.required],
      modelo: ['', Validators.required],
      propietario: ['', Validators.required],
      tipo_vehiculo: ['', Validators.required],
      anio: [''],
      ramv: [''],
      marca: [''],
      cilindraje: [''],
      clase_vehiculo: [''],
      origen: [''],
      combustible: [''],
      carroceria: [''],
      peso: [''],
      tipo_peso: [''],
      color: ['']
    });

    this.cargarTipos('vehiculo');

  }

  cargarTipos(path: string){
      this._tiposService.cargarTipos(path)
      .subscribe(
        ({tipos}) =>{
          this.tipos_vehiculos = tipos;
        }) 
  }

  cargarVehiculo( id: string ){
    if(id === 'nuevo'){
      return;
    }

    this._vehiculoService.cargarVehiculoPorId(id)
        .subscribe( (vehiculo: Vehiculo) => {
          if( !vehiculo ){
            return this.router.navigateByUrl(`/dashboard/vehiculos/administracion`);
          }

          this.vehiculoSeleccionado = vehiculo;
          
          this.vehiculoForm.setValue({
            placa: this.vehiculoSeleccionado.placa||'',
            vin: this.vehiculoSeleccionado.vin||'',
            motor: this.vehiculoSeleccionado.motor||'',
            modelo: this.vehiculoSeleccionado.modelo||'',
            propietario: this.vehiculoSeleccionado.propietario._id||'',
            tipo_vehiculo: this.vehiculoSeleccionado.tipo_vehiculo||'',
            anio: this.vehiculoSeleccionado.anio||'',
            ramv: this.vehiculoSeleccionado.ramv||'',
            marca: this.vehiculoSeleccionado.marca||'',
            cilindraje: this.vehiculoSeleccionado.cilindraje||'',
            clase_vehiculo: this.vehiculoSeleccionado.clase_vehiculo||'',
            origen: this.vehiculoSeleccionado.origen||'',
            combustible: this.vehiculoSeleccionado.combustible||'',
            carroceria: this.vehiculoSeleccionado.carroceria||'',
            peso: this.vehiculoSeleccionado.peso||'',
            tipo_peso: this.vehiculoSeleccionado.tipo_peso||'',
            color: this.vehiculoSeleccionado.color||'',
          });
          this.usuarioRegistro = this.vehiculoSeleccionado.usuario.nombre;
          return true;
        }
      )
  }

  guardarVehiculo(){
    if(this.vehiculoSeleccionado){

      const cid = this.vehiculoSeleccionado._id;
      const data = {
        _id: cid,
        ...this.vehiculoForm.value,        
      }

      console.log(this.vehiculoForm.value);

      this._vehiculoService.actualizarVehiculo(data)
        .subscribe(
          (resp: any) => {
            Swal.fire('Creado', `El vehiculo ha sido actualizado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/vehiculos/administracion`);
          },
          (err) => {
            Swal.fire('Error', err.error.msg, 'error' );
          }
        )
    }else{

      console.log(this.vehiculoForm.value);

        this._vehiculoService.crearVehiculo(this.vehiculoForm.value)
        .subscribe(
          (resp: any) => {
            Swal.fire('Creado', `El vehiculo ha sido creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/vehiculos/administracion`);
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
