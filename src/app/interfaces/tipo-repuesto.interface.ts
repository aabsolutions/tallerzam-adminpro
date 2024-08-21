import { TipoDeRepuesto } from "../models/tipo_repuesto.model";

export interface CargarTipoDeRepuesto{
    total: number;
    tiposDeRepuesto: TipoDeRepuesto[];
}