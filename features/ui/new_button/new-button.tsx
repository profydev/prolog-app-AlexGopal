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
  hideIcon?: boolean; // NEW: Controls whether the icon should be hidden
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
  iconSrc = "/icons/circle.svg",
  iconAlt = "icon",
  hideIcon = false, // Default: Icon is visible
}: ButtonProps) {
  const commonClasses = `${styles.button} ${styles[size]} ${styles[color]} ${styles[iconPosition]} ${styles[state]} ${className}`;

  const renderIcon = hideIcon ? null : (
    <img src={iconSrc} alt={iconAlt} className={styles.icon} />
  );

  if (href) {
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
        {iconPosition === "only" && renderIcon}
      </a>
    );
  }

  return (
    <button className={commonClasses} disabled={disabled} onClick={onClick}>
      {iconPosition === "before" && renderIcon}
      {iconPosition !== "only" && <span>{children}</span>}
      {iconPosition === "after" && renderIcon}
      {iconPosition === "only" && renderIcon}
    </button>
  );
}
