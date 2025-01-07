// // import {Routes} from "@config/routes";
// // import styles from "./header.module.scss";
// // import Link from "next/link";
// // import Image from "next/image";
// // import menuIcon from "@icons/menu-dark.svg";
// // import closeIcon from "@icons/close-dark.svg";
// // import {useState} from "react";
// // import {Button} from "@features/ui";
// // const navLinks = [
// //     {label: "Home", href: "/"},
// //     {label: "Products", href: "/products"},
// //     {label: "Documentation", href: "/documentation"},
// //     {label: "Pricing", href: "/pricing"},
// // ]

// // export function Header () {
// //     const [isMenuOpen, setIsMenuOpen] = useState(false);
// //     return(
// //         <header className={styles.header}>
// //         {/* eslint-disable-next-line @next/next/no-img-element */}
// //         <img src="/icons/logo-large.svg" alt="Prolog logo" />
// //         <nav className = {styles.nav}>
// //             <ul className = {styles.linkList}>
// //                 {navLinks.map((link) => (
// //                     <li key = {link.label} >
// //                         <Link href = {link.href}>{link.label}</Link>
// //                     </li>
// //                 ))}
// //             </ul>
// //             <a href={Routes.projects}>Dashboard</a>
// //         </nav>

// //         <Button
// //         className = {styles.mobileMenuButton}
// //         onClick = {() => setIsMenuOpen(!isMenuOpen)}
// //         >
// //         <Image
// //             src = {isMenuOpen ? closeIcon : menuIcon}
// //             alt = {isMenuOpen ? "Close Menu" : "Open Menu"}>
// //             />
// //         </Button>
// //       </header>)
// // }

// // import { Routes } from "@config/routes";
// // import styles from "./header.module.scss";
// // import Link from "next/link";
// // import Image from "next/image";
// // import menuIcon from "@icons/menu-dark.svg";
// // import closeIcon from "@icons/close-dark.svg";
// // import { useState } from "react";
// // import { Button } from "@features/ui";

// // const navLinks = [
// //   { label: "Home", href: "/" },
// //   { label: "Products", href: "/products" },
// //   { label: "Documentation", href: "/documentation" },
// //   { label: "Pricing", href: "/pricing" },
// // ];

// // export function Header() {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// //   return (
// //     <header className={styles.header}>
// //       {/* eslint-disable-next-line @next/next/no-img-element */}
// //       <img src="/icons/logo-large.svg" alt="Prolog logo" />

// //       <nav className={styles.nav}>
// //         <ul className={styles.linkList}>
// //           {navLinks.map((link) => (
// //             <li key={link.label}>
// //               <Link href={link.href}>{link.label}</Link>
// //             </li>
// //           ))}
// //         </ul>
// //         <a href={Routes.projects}>Dashboard</a>
// //       </nav>

// //       <Button
// //         className={styles.mobileMenuButton}
// //         onClick={() => setIsMenuOpen(!isMenuOpen)}
// //       >
// //         <Image
// //           src={isMenuOpen ? closeIcon : menuIcon}
// //           alt={isMenuOpen ? "Close Menu" : "Open Menu"}

// //         />
// //       </Button>
// //     </header>
// //   );
// // }

// import { Routes } from "@config/routes";
// import styles from "./header.module.scss";
// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import { Button } from "@features/ui";
// import classNames from "classnames"; // Import classNames utility

// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "Products", href: "/products" },
//   { label: "Documentation", href: "/documentation" },
//   { label: "Pricing", href: "/pricing" },
// ];

// export function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className={classNames(styles.header, isMenuOpen && styles.isMobileMenuOpen)}>
//       {/* Logo */}
//       <img src="/icons/logo-large.svg" alt="Prolog logo" />

//       {/* Navigation */}
//       <nav className={classNames(styles.nav, isMenuOpen && styles.isMobileMenuOpen)}>
//         <ul className={styles.linkList}>
//           {navLinks.map((link) => (
//             <li key={link.label}>
//               <Link href={link.href}>{link.label}</Link>
//             </li>
//           ))}
//         </ul>
//         <a href={Routes.projects}>Dashboard</a>
//       </nav>

//       {/* Mobile Menu Button */}
//       <Button
//         className={styles.mobileMenuButton}
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//       >
//         <Image
//           src={isMenuOpen ? "/icons/close-dark.svg" : "/icons/menu-dark.svg"}
//           alt={isMenuOpen ? "Close Menu" : "Open Menu"}
//           width={24} // Set width (adjust based on design)
//           height={24} // Set height (adjust based on design)
//         />
//       </Button>
//     </header>
//   );
// }

// // import { Routes } from "@config/routes";
// // import styles from "./header.module.scss";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { useState } from "react";
// // import { Button } from "@features/ui";
// // import classNames from "classnames"; // Utility for conditional classes

// // const navLinks = [
// //   { label: "Home", href: "/" },
// //   { label: "Products", href: "/products" },
// //   { label: "Documentation", href: "/documentation" },
// //   { label: "Pricing", href: "/pricing" },
// // ];

// // export function Header() {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// //   return (
// //     <header
// //       className={classNames(styles.header, {
// //         [styles.isMobileMenuOpen]: isMenuOpen,
// //       })}
// //     >
// //       {/* Logo */}
// //       <img src="/icons/logo-large.svg" alt="Prolog logo" />

// //       {/* Navigation */}
// //       <nav
// //         className={classNames(styles.nav, {
// //           [styles.isMobileMenuOpen]: isMenuOpen,
// //         })}
// //       >
// //         <ul className={styles.linkList}>
// //           {navLinks.map((link) => (
// //             <li key={link.label}>
// //               <Link href={link.href}>{link.label}</Link>
// //             </li>
// //           ))}
// //         </ul>
// //         <a href={Routes.projects}>Dashboard</a>
// //       </nav>

// //       {/* Mobile Menu Button */}
// //       <Button
// //         className={styles.mobileMenuButton}
// //         onClick={() => setIsMenuOpen(!isMenuOpen)}
// //       >
// //         <Image
// //           src={isMenuOpen ? "/icons/close-dark.svg" : "/icons/menu-dark.svg"}
// //           alt={isMenuOpen ? "Close Menu" : "Open Menu"}
// //           width={24}
// //           height={24}
// //         />
// //       </Button>
// //     </header>
// //   );
// // }

// import Image from 'next/image';
import Link from "next/link";
import { Routes } from "config/routes";
import styles from "./header.module.scss";
import { Button } from "@features/ui";
import { useState } from "react";
import classNames from "classnames"; // Utility for conditional classes

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Documentation", href: "/documentation" },
  { label: "Pricing", href: "/pricing" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className={styles.header}>
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
        <a href={Routes.projects}>Dashboard</a>
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
