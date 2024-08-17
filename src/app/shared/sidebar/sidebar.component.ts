import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
          `.has-arrow.waves-effect.waves-dark.active {
      background-color: transparent;
      }`
  ]
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;

  constructor( public sidebarSrv: SidebarService,
               private usuarioSrv: UsuarioService){
                
    this.usuario = usuarioSrv.usuario;
    this.sidebarSrv.cargarMenu();
  }

  ngOnInit(): void {
  }

}
