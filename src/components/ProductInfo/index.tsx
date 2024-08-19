'use client'

import Image from 'next/image';
import { Product } from '@/types';
import { useEffect, useState } from 'react';
import styles from './ProductInfo.module.scss';
import cartIcon from '@/assets/shoppingCartSimple.png';
import { fetchProductById } from '@/services/fetchProductsById';
import { useStore } from '@/store';
import { calculateDiscountedPrice } from '@/utils/calc';
import Link from 'next/link';
import StarRating from '../StarRating';
import ProductDetails from '../ProductDetails';
import { SnackbarProvider, enqueueSnackbar } from "notistack";

interface ProductInfoProps {
    productId: string | undefined;
}

export default function ProductInfo({ productId }: ProductInfoProps){
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(0);
    const addToCart = useStore((state) => state.addToCart);

    const disbaled = quantity <= 0;

    const productInfo = async (productId: string) => {
        const productInfo = await fetchProductById(productId);
        setProduct(productInfo ?? null);
    };

    useEffect(() => {
        productInfo(productId ?? '');
    }, [ productId ]);
    
    if (!product) {
        return <div className={styles.loader}></div>;
    }
    const discountedPrice = calculateDiscountedPrice(product.price, product.discount);

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        enqueueSnackbar('Quantity updated', {variant: 'info'});
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
        enqueueSnackbar('Quantity updated', {variant: 'info'});
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        enqueueSnackbar('Product added to cart', {variant: 'success'});
    };

    return (
        <div className={styles.productInfoContainerWrapper}>
            <SnackbarProvider maxSnack={3}/>
            <div className={styles.productInfoContainer}>
                <div className={styles.productImage}>
                    <Image 
                        src={product.image} 
                        alt={product.name} 
                        width={400} 
                        height={400} 
                        className={styles.image}
                    />
                </div>
                <div className={styles.productDetails}>
                    <div className={styles.rating}>
                        <StarRating rating={product.rating ?? 0} />
                        <span className={styles.raitingText}> {product.rating} Star Rating </span> 
                        <span className={styles.raitingFeedBack}> ({product.reviews_number} User feedback) </span>
                    </div>
                    <h1>{product.name}</h1>
                    <div className={styles.summary}>{product.summary}</div>

                    <div className={styles.productAdditionalDetails}>
                        <div>
                            <div><span className={styles.key}>SKU:</span> <span className={styles.value}>A264671</span></div>
                            <div><span className={styles.key}>Brand:</span> <span className={styles.value}>Tech</span></div>
                        </div>
                        <div>
                            <div><span className={styles.key}>Availability:</span> <span className={`${styles.value} ${styles['availability-value']}`}>In Stock</span></div>
                            <div><span className={styles.key}>Category:</span> <span className={styles.value}>Electronics Devices</span></div>
                        </div>
                    </div>

                    <div className={styles.price}>
                        <span>${discountedPrice}</span>
                        {product.discount > 0 && (
                            <>
                                <del>${product.price.toFixed(2)}</del>
                                <span className={styles.discount}>{product.discount}% OFF</span>
                            </>
                        )}
                    </div>
                    <div className={styles.productActions}>
                        <div className={styles.quantitySelector}>
                            <button onClick={handleDecrement}>-</button>
                            <span>{quantity.toString().padStart(1)}</span>
                            <button onClick={handleIncrement}>+</button>
                        </div>
                        <div className={styles.actionButtons}>
                            <button disabled={disbaled} className={styles.addToCartButton} onClick={handleAddToCart}>
                                Add to Cart
                                <Image className={styles['cart-icon']} src={cartIcon} alt="Cart" width={20} height={20}/>
                            </button>
                            <Link href="/cart">
                                <button className={styles.buyNow}>Buy Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <ProductDetails/>
        </div>
    );
}
