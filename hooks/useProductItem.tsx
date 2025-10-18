import { userCartStore } from "@/hooks/usecartStore";
import { Props } from "@/interfaces/propsItem";

export function useProductItem() {
    const addToCart = userCartStore((state) => state.addProduct);

    const handleAddToCart = (props: Props) => {
        addToCart(props.product);
    };

    return {
        handleAddToCart,
        addToCart
    };
}