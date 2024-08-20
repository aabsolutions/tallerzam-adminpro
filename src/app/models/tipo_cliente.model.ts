interface _ClienteUsuario{
    _id: string,
    nombre: string,
    img: string
}

export class TipoDeCliente{
    constructor(
        public descripcion: string,
        public _id?: string,
        public usuario?: _ClienteUsuario,
        public estado?: boolean,
    ){}
}

