interface _TipoRepuestoUsuario{
    _id: string,
    nombre: string,
    img: string
}

export class TipoDeRepuesto{
    constructor(
        public descripcion: string,
        public _id?: string,
        public usuario?: _TipoRepuestoUsuario,
        public estado?: boolean,
    ){}
}

