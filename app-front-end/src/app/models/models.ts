export interface ProductModel {
  codigo: number;
  nombre: string;
  foto: string;
  descripcion: string;
}

export interface ProductModels2 {
  codigo?: string;
  descripcion?: string;
  categoria?: string;
  proveedor?: string;
  provDescr?: string;
  precio?: number;
}