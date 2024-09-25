import packageJson from "../../package.json";
import Link from "next/link";
import styles from "./footer.module.scss";
import Image from "next/image";

export function Footer() {
  const version = packageJson.version;
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left-aligned version */}
        <div className={styles.version}>
          <span>Version: {version}</span>
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
