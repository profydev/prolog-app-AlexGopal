import React, { useEffect, useRef } from "react";
import styles from "./checkbox.module.scss";

export type CheckboxSize = "sm" | "md";
export type CheckboxState = "checked" | "unchecked" | "indeterminate";

type CheckboxProps = {
  size?: CheckboxSize;
  state?: CheckboxState;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({
  size = "sm",
  state = "checked",
  onChange,
}: CheckboxProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = state === "indeterminate";
    }
  }, [state]);

  return (
    <div className={`${styles.checkboxWrapper} ${styles[size]}`}>
      <input
        type="checkbox"
        id="checkbox"
        name="checkmarkbox"
        value="Bike"
        checked={state === "checked"}
        ref={checkboxRef}
        onChange={onChange}
        className={`${styles.input}`}
        // className={`${styles.input}`}
      />
      <label htmlFor="checkbox" className={styles.label}>
        Label
      </label>
    </div>
  );
}