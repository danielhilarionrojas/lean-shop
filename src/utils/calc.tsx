import { Product } from "@/types";

export function calculateDiscountedPrice(price: number, discount: number): string {
    const discountedPrice = price * (1 - discount / 100);
    return discountedPrice.toFixed(2);
  }

export const getTotalQuantity = (cart: Product[]): number => {
    return cart.reduce((total, product) => total + product.quantity, 0);
};