import Image from "next/image";
import styles from "./Footer.module.scss";
import cliconLogo from "@/assets/clicon-logo.png";
import appStoreLogo from "@/assets/app-store.png";
import googlePlayLogo from "@/assets/google-play.png";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <Image src={cliconLogo} alt="CLICON" className={styles.logo} />
                    <p>Customer Support: (555) 555-0129</p>
                    <p>1234 LeanShop Ave, Some City, Some Country</p>
                    <p>info@leanshop.com</p>
                </div>
                <div className={styles.column}>
                    <h3>Top Categories</h3>
                    <ul>
                        <li><a href="/">Computer & Laptop</a></li>
                        <li><a href="/">Smartphone</a></li>
                        <li><a href="/">Accessories</a></li>
                        <li><a href="/">Camera & Photo</a></li>
                        <li><a href="/">TV & Home</a></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Shop Product</a></li>
                        <li><a href="/">Shopping Cart</a></li>
                        <li><a href="/">Wishlist</a></li>
                        <li><a href="/">Compare</a></li>
                        <li><a href="/">Track Order</a></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h3>Download App</h3>
                    <div className={styles.appButtons}>
                        <a href="/" className={styles.appButton}>
                            <Image 
                                src={googlePlayLogo} 
                                alt="Google Play" 
                                width={30} 
                                height={30} 
                                className={styles.appLogo}
                            />
                            <div className={styles.textContainer}>
                                <span className={styles.getItNow}>Get it now</span>
                                <span className={styles.storeName}>Google Play</span>
                            </div>
                        </a>
                        <a href="/" className={styles.appButton}>
                            <Image 
                                src={appStoreLogo} 
                                alt="App Store" 
                                width={30} 
                                height={30} 
                                className={styles.appLogo}
                            />
                            <div className={styles.textContainer}>
                                <span className={styles.getItNow}>Get it now</span>
                                <span className={styles.storeName}>App Store</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div className={styles.column}>
                    <h3>Popular Tags</h3>
                    <ul className={styles.tags}>
                        <li><a href="/">Game</a></li>
                        <li><a href="/">iPhone</a></li>
                        <li><a href="/">TV</a></li>
                        <li><a href="/">Asus Laptops</a></li>
                        <li><a href="/">Macbook</a></li>
                        <li><a href="/">SSD</a></li>
                        <li><a href="/">Graphics Card</a></li>
                        <li><a href="/">Power Bank</a></li>
                        <li><a href="/">Smart TV</a></li>
                        <li><a href="/">Speaker</a></li>
                        <li><a href="/">Tablet</a></li>
                        <li><a href="/">Microwave</a></li>
                        <li><a href="/">Samsung</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.copyRight}>
                <p>© {new Date().getFullYear()} LeanShop - All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
