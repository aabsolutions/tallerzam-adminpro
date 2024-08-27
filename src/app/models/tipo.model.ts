interface _TipoUsuario{
    _id: string,
    nombre: string,
    img: string
}

export class Tipo{
    constructor(
        public descripcion: string,
        public _id?: string,
        public usuario?: _TipoUsuario,
        public estado?: boolean,
    ){}
}

