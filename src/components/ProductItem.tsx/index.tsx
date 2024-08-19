"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import styles from './ProductItem.module.scss';
import { FaEye } from 'react-icons/fa';
import { calculateDiscountedPrice } from '@/utils/calc';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'


import heartIcon from '@/assets/heart.png';
import cartIcon from '@/assets/shoppingCartSimple.png';
import { useStore } from '@/store';

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const router = useRouter();
  const addToCart = useStore((state) => state.addToCart);
  const discountedPrice = calculateDiscountedPrice(product.price, product.discount);

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div role='none' onClick={handleClick}>
      <SnackbarProvider />
      <li className={styles.productItem}>
        {product.discount > 0 && (
          <div className={styles.discountTag}>
            {product.discount}% OFF
          </div>
        )}
        <div className={styles.imageContainer}>
          <Image 
            src={product.image} 
            alt={product.name} 
            width={150} 
            height={150} 
            className={styles.productImage} 
          />
          <div className={styles.overlay}>
            <button className={styles.iconButton} onClick={(e) => { 
              e.stopPropagation() 
              enqueueSnackbar('Liked!', { variant: 'success' })
             }}
            >
              <Image src={heartIcon} alt="Heart" width={24} height={24} />
            </button>
            <button className={styles.iconButton} onClick={(e) => {
                e.stopPropagation()
                addToCart(product)
                enqueueSnackbar('Product added to cart', { variant: 'info' })
            }}>
              <Image src={cartIcon} alt="Cart" width={24} height={24} />
            </button>
            <button className={styles.iconButton} onClick={ handleClick }><FaEye /></button>
          </div>
        </div>
        <div className={styles.productDetails}>
          <h3 className={styles.productName}>{product.name}</h3>
          <div className={styles.priceContainer}>
            {product.discount > 0 && (
              <span className={styles.oldPrice}>${product.price}</span>
            )}
            <span className={styles.newPrice}>${discountedPrice}</span>
          </div>
        </div>
      </li>
    </div>
  );
}
