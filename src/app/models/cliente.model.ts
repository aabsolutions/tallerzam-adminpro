interface _ClienteUsuario{
    _id: string,
    nombre: string,
    img: string
}

interface _ClienteTipo{
    _id: string,
    descripcion: string
}

export class Cliente{
    constructor(
        public tipo_cliente: _ClienteTipo,
        public cedula_ruc: string,
        public apellidos_razon_social: string,
        public nombres: string,
        public _id?: string,
        public ciudad?: string,
        public direccion?: string,
        public email?: string,
        public celular?: string,
        public img?: string,
        public usuario?: _ClienteUsuario,
        public estado?: boolean,
    ){}
}

