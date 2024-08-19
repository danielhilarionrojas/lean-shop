'use client';

import { Product } from '@/types';
import { useStore } from '@/store';
import ProductItem from '../ProductItem.tsx';
import styles from './ProductList.module.scss';
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '@/services/fetchProducts';

export default function ProductList() {
  const [loading, setLoading] = useState(true);
  const setProductsStore = useStore((state) => state.setProductsStore);

  useEffect(() => {
    const fetchAndStoreProducts = async () => {
      const products = await fetchProducts();
      setProductsStore(products);
      setLoading(false);
    };
    fetchAndStoreProducts();
  }, [setProductsStore]);
  
  const products = useStore((state) => state.productsStore);

  return (
    <div className={styles.productListContainer}>
      <h2>Más vistos</h2>
      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <ul className={styles.productList}>
          {products.map((product: Product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
}
