interface _ClienteUsuario{
    _id: string,
    nombre: string,
    img: string
}

export class Proveedor{
    constructor(
        public ruc: string,
        public razon_social: number,
        public direccion: string,
        public email?: string,
        public celular?: string,
        public telefono?: number,
        public ciudad?: string,
        public usuario?: _ClienteUsuario,
        public estado?: boolean,
        public _id?: string,
    ){}
}

