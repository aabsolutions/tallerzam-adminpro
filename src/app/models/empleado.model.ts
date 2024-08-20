interface _EmpleadoUsuario{
    _id: string,
    nombre: string,
    img: string
}

export class Empleado{
    constructor(
        public cedula: string,
        public apellidos: string,
        public nombres: string,
        public tipo_empleado: string,
        public f_nac?: string,
        public celular?: string,
        public email?: string,
        public direccion?: string,
        public _id?: string,
        public img?: string,
        public usuario?: _EmpleadoUsuario,
        public estado?: boolean,
    ){}
}

