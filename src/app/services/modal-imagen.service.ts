import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: 'usuarios'|'clientes'|'actas'|'titulos';
  public id: string;
  public img: string;
  public imagenCambio: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios'|'clientes'|'actas'|'titulos',
    id: string,
    img: string = 'no-image'
  ){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
  }

  cerrarModal(){
    this._ocultarModal = true;
  }

  constructor() { }
}
