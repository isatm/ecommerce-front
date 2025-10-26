import { Product } from "./productInterface";

// Definir carro
export interface CartItem extends Product {
    quantity: number;
    price: number;
    user_id: string;
}
// Importante, la interpretación de está libea es herencia, donde vemos la cantidad de productos que el hijo hereda de su padre, producto es padre xd

// utilizamos la definicion del carro y producto, y funcion
export interface CartStore {
    /* products CartItem, como se puede es un arreglo donde se guardan en el carro */
    products: CartItem[]; 
    /*addProduct: pasamos de parametro el producto que nos devuelve un void, ya que no hacemos más allá de agregar */
    addProduct: (product: Product) => void;
    /*Lo mismo para estos, pero con parametros de requisitos diferentes porque pues tienen sus parametros para cumplir con la funcion */
    removeProduct: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    /*Obtenemos los productos del carrito porque pues nada, de donde mas? */
    getTotal: () => number;
}