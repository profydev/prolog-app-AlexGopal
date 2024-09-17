import { version } from "../../package.json";
import styles from "./footer.module.scss";
import Image from "next/image";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left-aligned version */}
        <div className={styles.version}>
          <span>Version: {version}</span>
        </div>

        {/* Center-aligned buttons */}
        <nav className={styles.navLinks}>
          <button onClick={() => (window.location.href = "/docs")}>Docs</button>
          <button onClick={() => (window.location.href = "/api")}>API</button>
          <button onClick={() => (window.location.href = "/help")}>Help</button>
          <button onClick={() => (window.location.href = "/community")}>
            Community
          </button>
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
