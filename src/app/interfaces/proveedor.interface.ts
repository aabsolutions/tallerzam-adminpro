import { Proveedor } from "../models/proveedor.model";

export interface CargarProveedor{
    total: number;
    proveedores: Proveedor[];
}