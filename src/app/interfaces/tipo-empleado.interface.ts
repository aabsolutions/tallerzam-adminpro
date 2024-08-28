import { Tipo } from "../models/tipo.model";

export interface CargarTipoDeEmpleados{
    //estos valores deben llamarse igual que salen del backend
    total: number;
    tiposDeEmpleado: Tipo[];
}