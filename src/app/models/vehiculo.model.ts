interface _VehiculoUsuario{
    _id: string,
    nombre: string,
    img: string
}

interface _VehiculoTipo{
    _id: string,
    descripcion: string
}

interface _VehiculoPropietario{
    _id: string,
    apellidos_razon_social: number,
    nombres: number
}

export class Vehiculo{
    constructor(
        public placa: string,
        public vin: string,
        public motor: string,
        public modelo: string,
        public propietario: _VehiculoPropietario,
        public tipo_vehiculo: _VehiculoTipo,
        public anio?: number,
        public ramv?: string,
        public marca?: string,
        public cilindraje?: number,
        public clase_vehiculo?: string,
        public origen?: string,
        public combustible?: string,
        public carroceria?: string,
        public peso?: number,
        public tipo_peso?: string,
        public color?: string,
        public img?: string,
        public usuario?: _VehiculoUsuario,
        public estado?: boolean,
        public _id?: string
    ){}
}

