// import React from "react";
// import styles from "./new-button.module.scss";

// export type ButtonSize = "sm" | "md" | "lg" | "xlg";
// export type ButtonColor =
//   | "primary"
//   | "secondary"
//   | "gray"
//   | "empty"
//   | "empty-gray"
//   | "error"
//   | "empty-error";
// export type ButtonIconPosition = "before" | "after" | "only";
// // export type ButtonState = 'default' | 'hover' | 'focused' | 'disabled';
// export type ButtonState = "default" | "disabled";

// type ButtonProps = {
//   size?: ButtonSize;
//   color?: ButtonColor;
//   iconPosition?: ButtonIconPosition;
//   state?: ButtonState;
//   disabled?: boolean;
//   onClick?: () => void;
//   children?: React.ReactNode; // Allow children as a prop
//   className?: string; // Add className to the props
// };

// export function NewButton({
//   size = "md",
//   color = "primary",
//   iconPosition = "before",
//   state = "default",
//   disabled = false,
//   onClick,
//   children,
//   className,
// }: ButtonProps) {
//   return (
//     <button
//       className={`${styles.button} ${styles[size]} ${styles[color]} ${styles[iconPosition]} ${styles[state]}`}
//       disabled={disabled}
//       onClick={onClick}
//     >
//       {/* Render the icon always */}
//       <img src="/icons/circle.svg" alt="icon" className={styles.icon} />

//       {/* Render the text only if the iconPosition is not 'only' */}
//       {iconPosition !== "only" && <span>{children}</span>}
//     </button>
//   );
// }

import React from "react";
import styles from "./new-button.module.scss";

export type ButtonSize = "sm" | "md" | "lg" | "xlg";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "gray"
  | "empty"
  | "empty-gray"
  | "error"
  | "empty-error";
export type ButtonIconPosition = "before" | "after" | "only";
export type ButtonState = "default" | "disabled";

type ButtonProps = {
  size?: ButtonSize;
  color?: ButtonColor;
  iconPosition?: ButtonIconPosition;
  state?: ButtonState;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  iconSrc?: string; // Customizable icon source
  iconAlt?: string; // Accessible text for the icon
};

export function NewButton({
  size = "md",
  color = "primary",
  iconPosition = "before",
  state = "default",
  disabled = false,
  onClick,
  href,
  children,
  className = "",
  iconSrc = "/icons/circle.svg", // Default placeholder icon
  iconAlt = "icon", // Default alt text
}: ButtonProps) {
  const commonClasses = `${styles.button} ${styles[size]} ${styles[color]} ${styles[iconPosition]} ${styles[state]} ${className}`;

  const renderIcon = (
    <img src={iconSrc} alt={iconAlt} className={styles.icon} />
  );

  if (href) {
    // Render an anchor element if href is provided
    return (
      <a
        href={href}
        className={commonClasses}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {iconPosition === "before" && renderIcon}
        {iconPosition !== "only" && <span>{children}</span>}
        {iconPosition === "after" && renderIcon}
        {iconPosition === "only" && renderIcon} {/* Explicitly render icon */}
      </a>
    );
  }

  // Render a button element otherwise
  return (
    <button className={commonClasses} disabled={disabled} onClick={onClick}>
      {iconPosition === "before" && renderIcon}
      {iconPosition !== "only" && <span>{children}</span>}
      {iconPosition === "after" && renderIcon}
      {iconPosition === "only" && renderIcon} {/* Explicitly render icon */}
    </button>
  );
}
