// import { ButtonHTMLAttributes } from "react";
import React from "react";
// import classNames from "classnames";
import styles from "./new-button.module.scss";

// export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
//   return (
//     <button {...props} className={classNames(styles.button, props.className)} />
//   );
// }

// export enum ButtonSize {
//   sm = "sm",
//   md = "md",
//   lg = "lg",
// }

// export enum ButtonColor {
//   primary = "primary",
//   gray = "gray",
//   error = "error",
//   warning = "warning",
//   success = "success",
// }

// export enum ButtonIcon {
//   before = "before",
//   trialing = "trialing",
//   only = "only",
// }

// type ButtonProps = {
//   size: ButtonSize;
//   color: ButtonColor;
//   icon?: ButtonIcon;
// }

// export function Button({color, size, icon}: ButtonProps) {
//   return (
//     <div>
//       <button className = {classNames(styles.container, styles[size], styles[color])}>
//         <img src={"/icons/circle.svg"} alt="icon" className={styles.icon} />
//         <span>Button CTA</span>
//       </button>
//     </div>
//   )
// }

// Button Component (button.tsx)

// Button Component (button.tsx)

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
};

// export function Button({ size = 'md', color = 'primary', iconPosition = 'before', onClick }: ButtonProps) {
//   return (
//     <button
//       className={`${styles.button} ${styles[size]} ${styles[color]} ${styles[iconPosition]}`}
//       onClick={onClick}
//     >
//       {iconPosition === 'before' && <img src="/icons/icon.svg" alt="icon" className={styles.icon} />}
//       {iconPosition !== 'only' && <span>Button CTA</span>}
//       {iconPosition === 'after' && <img src="/icons/icon.svg" alt="icon" className={styles.icon} />}
//       {iconPosition === 'only' && <img src="/icons/icon.svg" alt="icon" className={styles.icon} />}
//     </button>
//   );
// }

export function NewButton({
  size = "md",
  color = "primary",
  iconPosition = "before",
  state = "default",
  disabled = false,
  onClick,
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
      {iconPosition !== "only" && <span>Button CTA</span>}
    </button>
  );
}
