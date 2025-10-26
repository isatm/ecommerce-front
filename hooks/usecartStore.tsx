

import { create } from "zustand"; 
import { persist } from "zustand/middleware";
// manejo de estado
// en pocas palabras zustand es el dueño de la pagina, donde con la funcion create donde tomamos y jugamos con los produtos
// podemos gestionarlos y condicionarlos a nuestro gusto, es como un hook donde se manejan estados, pero el hook es de react
// hook-> estados o metodos sonde se puede condcionar el sistema, pero no creo que tan flexible como zustadn, ya que este es más extenso de utilidad
// hook es más para menjo de codigo directo sin tanto condicional

// IMPORTANTE: es posible no utilizar zustand, peroooooooo habría que utilizar apis y aumentar la complejidad misma del codigo

import { Product } from "@/interfaces/product";
import { CartStore } from "@/interfaces/cart";

// 👇 Aquí ahora usamos `persist` para que el carrito quede guardado en localStorage
export const userCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            products: [],
            
            // Logica de agregar producto con los parametros de producto
            addProduct: (product: Product) => {
                set((state: CartStore) => { 
                    // Damos un estado al valor del producto, donde si el id del prodcuto a agregar es igual a un producto que se
                    // encuentra en la pagina entonces sabemos que el producto se encuentra
                const existingProduct = state.products.find(p => p.id === product.id);
                
                // Si el producto existe entonces, hacemos un codicional que retorna el estado del producto, donde es mapeado
                // y con ello al ver que se encuientra entonces la cantidad de productos se agrega juajuajua (que nunca nos compren) 
                if (existingProduct) {
                    return {
                    products: state.products.map(p =>
                        p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                    )
                    };
                } // ahora tetornamos el prudcto y la cantidad de este
                // aseguramos que el nuevo elemento cumpla con la interfaz CartItem (incluyendo user_id)
                const newCartItem = { ...product, quantity: 1, user_id: "" };
                return { 
                    products: [...state.products, newCartItem] 
                };
                });
            },
            
            // segun el id, vemos el estado del prodcuto, lo filtramos e eliminamos
            removeProduct: (productId: number) => {
                set((state) => ({
                products: state.products.filter(p => p.id !== productId)
                }));
            },
            
            // Pasamos los parametros, estados, buscamos mapeando los prodcutos si son igual de forma opacional o recorrida, cambiamos la canridad o 
            // lo que se desea actualizar, después filtramos sin cambiar el arreglo para actualizar el valor y la cantidad
            updateQuantity: (productId: number, quantity: number) => {
                set((state) => ({
                products: state.products.map(p =>
                    p.id === productId
                    ? { ...p, quantity: Math.max(0, quantity) }
                    : p
                ).filter(p => p.quantity > 0)
                }));
            },

            // pues obtenemos los productos y cantidad xd, para qué más?
            getTotal: () => {
                const { products } = get();
                return products.reduce((total, product) => 
                total + (product.price * product.quantity), 0
                );
            }
        }),
        {
            name: "cart-storage", 
        }
    )
);
