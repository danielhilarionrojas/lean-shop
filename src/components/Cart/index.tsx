import axios from "axios";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store";
import styles from './Cart.module.scss';
import xcircle from "@/assets/XCircle.png";
import arrowLeft from "@/assets/ArrowLeft.png";
import arrowRight from "@/assets/ArrowRight.png";
import { useRouter } from "next/navigation";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export default function Cart() {
    const router = useRouter();
    const products = useStore((state) => state.cart);
    console.log('Products:', products);

    const clearCart = useStore((state) => state.clearCart)
    const removeAllRelatedProducts = useStore((state) => state.removeAllRelatedProducts);
    const incrementQuantity = useStore((state) => state.incrementQuantity);
    const decrementQuantity = useStore((state) => state.decrementQuantity);

    const calculateDiscountedPrice = (price: number, discount?: number) => {
        return discount ? price - (price * (discount / 100)) : price;
    };

    const calculateSubTotal = (price: number, quantity: number) => {
        return price * quantity;
    };

    const subTotal = products?.reduce((total, item) => {
        return total + calculateSubTotal(calculateDiscountedPrice(item.price, item.discount), item.quantity);
    }, 0);

    const discountTotal = products?.reduce((total, item) => {
        if (item.discount) {
            return total + ((item.price - calculateDiscountedPrice(item.price, item.discount)) * item.quantity);
        }
        return total;
    }, 0);

    const handleRemoveAllRelatedProducts = (productId: string) => {
        removeAllRelatedProducts(productId);
    };

    const handleCheckout = async () => {
        try {
            const payload = products.map(product => ({
                product: product.id,
                quantity: product.quantity
            }));
    
            const response = await axios.post('https://pm3uf3zxsxf.us-east-1.awsapprunner.com/purchase-products', JSON.stringify(payload), {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'User-Agent': 'PostmanRuntime/7.40.0'
                }
            });
            if (response.status === 200) {
                enqueueSnackbar('Purchase successful', {variant: 'success'});
                clearCart();
            }
            console.log('Purchase successful', response.data);
        } catch (error: any) {
            console.error('Error making purchase', error.response ? error.response.data : error.message);
        }
    };

    const handleCheckoutAndRedirect = async () => {
        await handleCheckout();
        enqueueSnackbar('Purchase successful', {variant: 'success'});
        clearCart();
        router.push('/');
    };
      
    return (
        <div className={styles.cartContainer}>
            <SnackbarProvider />
            <div className={styles.cartItems}>
                <h1 className={styles.title}>Shopping Cart</h1>
                {products.length === 0 ? (
                        <p>Cart Empty :(</p>
                ) : (
                    <table className={styles.cartTable}>
                        <thead>
                            <tr className={styles.headers}>
                                <th></th>
                                <th>Products</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Sub-total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <button className={styles.removeButton} onClick={() => {
                                            handleRemoveAllRelatedProducts(item.id)
                                            enqueueSnackbar('Product removed from cart', { variant: 'warning' })
                                            }}
                                        >
                                            <Image src={xcircle} alt="Remove" width={20} height={20} />
                                        </button>
                                    </td>
                                    <td className={styles.productInfo}>
                                        <Image src={item.image} alt={item.name} width={70} height={70} />
                                        <span>{item.name}</span>
                                    </td>
                                    <td>
                                        {!!item.discount && <del>${item.price.toFixed(2)}</del>}
                                        <span>${calculateDiscountedPrice(item.price, item.discount).toFixed(2)}</span>
                                    </td>
                                    <td className={styles.quantityControl}>
                                        <button onClick={() => {
                                            decrementQuantity(item.id)
                                            enqueueSnackbar('Quantity Updated', {variant: 'success'})
                                            }}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => {
                                            incrementQuantity(item.id)
                                            enqueueSnackbar('Quantity Updated', {variant: 'success'})
                                            }}
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td>${calculateSubTotal(calculateDiscountedPrice(item.price, item.discount), item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className={styles.cartActions}>
                    <Link href="/">
                        <button className={styles.returnToShop}>
                            <Image src={arrowLeft} alt="arrowLeft" width={20} height={20}/>
                            Return to Shop
                        </button>
                    </Link>
                    <button onClick={() => enqueueSnackbar('Cart Updated', {variant: 'success'})} className={styles.updateCart}>Update Cart</button>
                </div>
            </div>
            {products.length > 0 && (
                <div className={styles.cartTotals}>
                    <h2>Cart Totals</h2>
                    <div className={styles.totals}>
                        <div>
                            <span>Sub-total</span>
                            <span>${subTotal?.toFixed(2)}</span>
                        </div>
                        <div>
                            <span>Discount</span>
                            <span>${discountTotal?.toFixed(2)}</span>
                        </div>
                        <div className={styles.total}>
                            <span>Total</span>
                            <span>${(subTotal - (discountTotal ?? 0)).toFixed(2)} USD</span>
                        </div>
                        <button onClick={handleCheckoutAndRedirect} className={styles.checkout}>Proceed to Checkout <Image src={arrowRight} alt="arrowLeft" width={20} height={20}/> </button>
                    </div>
                </div>
            )}
        </div>
    );
}