interface _TipoEmpleadoUsuario{
    _id: string,
    nombre: string,
    img: string
}

export class TipoDeEmpleado{
    constructor(
        public descripcion: string,
        public _id?: string,
        public usuario?: _TipoEmpleadoUsuario,
        public estado?: boolean,
    ){}
}

