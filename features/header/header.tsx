// import Image from 'next/image';
import Link from "next/link";
import { Routes } from "config/routes";
import styles from "./header.module.scss";
import { Button } from "@features/ui";
import { useState } from "react";
import classNames from "classnames"; // Utility for conditional classes
import { NewButton } from "@features/ui";
import { useRouter } from "next/router"; // Import the useRouter hook
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Documentation", href: "/documentation" },
  { label: "Pricing", href: "/pricing" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter(); // Initialize router
  return (
    <header
      className={classNames(
        styles.header,
        isMenuOpen && styles.isMobileMenuOpen,
      )}
    >
      <img src="/icons/logo-large.svg" alt="Prolog logo" />
      <nav
        className={classNames(
          styles.nav,
          isMenuOpen && styles.isMobileMenuOpen,
        )}
      >
        <ul className={styles.linkList}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        {/* <a href={Routes.projects}>Dashboard</a> */}
        <NewButton
          size="sm"
          color="primary"
          onClick={() => router.push(Routes.projects)} // Use router here
        >
          Open Dashboard
        </NewButton>
      </nav>

      <Button
        className={styles.mobileMenuButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img
          src={isMenuOpen ? "/icons/close-dark.svg" : "/icons/menu-dark.svg"}
          alt={isMenuOpen ? "Close Menu" : "Open Menu"}
        />
      </Button>
    </header>
  );
}
