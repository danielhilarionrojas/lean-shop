'use client'

import Link from "next/link";
import { FaShop } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import styles from "./Navbar.module.scss";
import { useStore } from "@/store";
import { getTotalQuantity } from "@/utils/calc";
import { Product } from "@/types";

const Navbar = () => {
    const cart = useStore((state) => state.cart);
    const totalQuantity = getTotalQuantity(cart as Product[]);

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    <div className={styles.brand}>
                        <FaShop size={28} />
                        <Link href="/" className={styles.brandName}>
                            LeanShop
                        </Link>
                    </div>
                    <div className={styles.cart}>
                        <Link href="/cart">
                            <div className={styles.cartIcon}>
                                <FiShoppingCart size={28} />
                                {totalQuantity > 0 && (
                                    <span className={styles.cartBadge}>{totalQuantity}</span>
                                )}
                            </div>
                        </Link>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;