import { Producto } from "../models/producto.model";

export interface CargarProducto{
    total: number;
    estudiantes: Producto[];
}