import styles from "./footer.module.scss";
import Image from "next/image";

// export function Footer() {
//   return (
//     <footer className={styles.footer}>
//       {/* Left-aligned version */}
//       <div className={styles.version}>
//         <span>Version: 14.5.1</span>
//       </div>

//       {/* Center-aligned buttons */}
//       <nav className={styles.navLinks}>
//         <button onClick={() => window.location.href = "/docs"}>Docs</button>
//         <button onClick={() => window.location.href = "/api"}>API</button>
//         <button onClick={() => window.location.href = "/help"}>Help</button>
//         <button onClick={() => window.location.href = "/community"}>Community</button>
//       </nav>

//       {/* Right-aligned logo */}
//       <div className={styles.footerInfo}>
//         <img src={"/icons/logo-small.svg"} alt="ProLog Logo" className={styles.logo} />
//       </div>
//     </footer>
//   );
// }

// export function Footer() {
//   return (
//     <footer className={styles.footer}>
//       <div className={styles.container}>
//         <div className={styles.footerInfo}>
//           <span className={styles.version}>Version: 14.5.1</span>

//           {/* Footer Links */}
//           <nav className={styles.navLinks}>
//             <a href="/docs" className={styles.link}>Docs</a>
//             <a href="/api" className={styles.link}>API</a>
//             <a href="/help" className={styles.link}>Help</a>
//             <a href="/community" className={styles.link}>Community</a>
//           </nav>

//           {/* Footer Logo */}
//           <div className={styles.logoWrap}>
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img src="/icons/logo-small.svg" alt="ProLog logo" className={styles.logo} />
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export function Footer() {
//   return (
//     <footer className={styles.footer}>
//       <div className={styles.container}>

//         {/* Left-aligned version */}
//         <div className={styles.version}>
//           <span>Version: 14.5.1</span>
//         </div>

//         {/* Center-aligned buttons */}
//         <nav className={styles.navLinks}>
//           <button onClick={() => window.location.href = "/docs"}>Docs</button>
//           <button onClick={() => window.location.href = "/api"}>API</button>
//           <button onClick={() => window.location.href = "/help"}>Help</button>
//           <button onClick={() => window.location.href = "/community"}>Community</button>
//         </nav>

//         {/* Right-aligned logo */}
//         <Image src="/icons/logo-small.svg" alt="ProLog Logo" className={styles.logo} width={33} height={33} />

//       </div>
//     </footer>
//   );
// }

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left-aligned version */}
        <div className={styles.version}>
          <span>Version: 14.5.1</span>
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
