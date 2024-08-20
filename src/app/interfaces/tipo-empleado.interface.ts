import { TipoDeEmpleado } from "../models/tipo_empleado.model";

export interface CargarTipoDeEmpleados{
    //estos valores deben llamarse igual que salen del backend
    total: number;
    tiposDeEmpleado: TipoDeEmpleado[];
}