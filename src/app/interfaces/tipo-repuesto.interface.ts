import { Tipo } from "../models/tipo.model";

export interface CargarTipoDeRepuesto{
    total: number;
    tiposDeRepuesto: Tipo[];
}