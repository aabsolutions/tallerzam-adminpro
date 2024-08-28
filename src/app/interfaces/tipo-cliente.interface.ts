import { Tipo } from "../models/tipo.model";

export interface CargarTipoDeCliente{
    total: number;
    tiposDeCliente: Tipo[];
}