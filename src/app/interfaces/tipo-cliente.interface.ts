import { TipoDeCliente } from "../models/tipo_cliente.model";

export interface CargarTipoDeCliente{
    total: number;
    tiposDeCliente: TipoDeCliente[];
}