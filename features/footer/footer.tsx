import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { NavigationContext } from "../layout/sidebar-navigation/navigation-context"; // Adjust the path if necessary
import styles from "./footer.module.scss";

export function Footer() {
  const { isSidebarCollapsed } = useContext(NavigationContext);

  return (
    <footer
      className={`${styles.footer} ${
        isSidebarCollapsed ? styles.isCollapsed : ""
      }`}
    >
      <div className={styles.container}>
        {/* Left-aligned version */}
        <div className={styles.version}>
          <span>Version: {process.env.appVersion}</span>
        </div>

        {/* Center-aligned buttons */}
        <nav className={styles.navLinks}>
          <Link href="/#" className={styles.link}>
            Docs
          </Link>
          <Link href="/#" className={styles.link}>
            API
          </Link>
          <Link href="/#" className={styles.link}>
            Help
          </Link>
          <Link href="/#" className={styles.link}>
            Community
          </Link>
        </nav>

        {/* Right-aligned logo */}
        <div className={styles.logoWrap}>
          <Image
            src="/icons/logo-small.svg"
            alt="ProLog Logo"
            className={styles.logo}
            width={160} // Width of the wrapper, logo will be centered
            height={33} // Height of the logo
          />
        </div>
      </div>
    </footer>
  );
}
