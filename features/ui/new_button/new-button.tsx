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
// export type ButtonState = 'default' | 'hover' | 'focused' | 'disabled';
export type ButtonState = "default" | "disabled";

type ButtonProps = {
  size?: ButtonSize;
  color?: ButtonColor;
  iconPosition?: ButtonIconPosition;
  state?: ButtonState;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode; // Allow children as a prop
};

export function NewButton({
  size = "md",
  color = "primary",
  iconPosition = "before",
  state = "default",
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[color]} ${styles[iconPosition]} ${styles[state]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {/* Render the icon always */}
      <img src="/icons/circle.svg" alt="icon" className={styles.icon} />

      {/* Render the text only if the iconPosition is not 'only' */}
      {iconPosition !== "only" && <span>{children}</span>}
    </button>
  );
}
