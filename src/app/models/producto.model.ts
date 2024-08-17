interface _ProductoUsuario{
    _id: string,
    nombre: string,
    img: string
}

interface _ProductoProveedor{
    _id: string,
    razon_social: string
}

interface _ProductoTipoRepuesto{
    _id: string,
    descripcion: string
}

export class Producto{
    constructor(
        public matricula: string,
        public descripcion: string,
        public stock: number,
        public stock_minimo: number,
        public costo: number,
        public precio: number,
        public unidad: string,
        public tipo_repuesto: _ProductoTipoRepuesto,
        public proveedor: _ProductoProveedor,
        public codigo?: string,
        public modelo?: string,
        public marca?: string,
        public procedencia?: string,
        public img?: string,
        public observacion?: string,
        public usuario?: _ProductoUsuario,
        public estado?: boolean,
    ){}
}

