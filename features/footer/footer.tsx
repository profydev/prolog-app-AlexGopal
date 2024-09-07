import styles from "./footer.module.scss";
import Image from "next/image";

export function Footer() {
  return (
    // <div className = {styles.footer}>
    //     hello
    // </div>
    <div>
      {/* <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            <p>Contact us at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a></p> */}
      <footer className={styles.footer}>
        <nav className={styles.navLinks}>
          <a href="/docs">Docs</a>
          <a href="/api">API</a>
          <a href="/help">Help</a>
          <a href="/community">Community</a>
        </nav>
        <div className={styles.footerInfo}>
          <span>Version: 14.5.1</span>
          <Image
            src="/icons/logo-small.svg"
            alt="ProLog Logo"
            width={50}
            height={50}
            className={styles.logo}
          />
        </div>
      </footer>
    </div>
  );
}
