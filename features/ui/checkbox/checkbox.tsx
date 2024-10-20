import React, { useEffect, useRef } from "react";
import styles from "./checkbox.module.scss";

export type CheckboxSize = "sm" | "md";
export type CheckboxState = "checked" | "unchecked" | "indeterminate";

type CheckboxProps = {
  size?: CheckboxSize;
  state?: CheckboxState;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({
  size = "sm",
  state = "checked",
  disabled = false,
  onChange,
}: CheckboxProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = state === "indeterminate";
    }
  }, [state]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent any change in the indeterminate state
    if (state === "indeterminate") {
      event.preventDefault(); // Prevent the checkbox from toggling
    } else if (onChange) {
      onChange(event); // Call the onChange handler for other states
    }
  };

  return (
    <div className={`${styles.checkboxWrapper} ${styles[size]}`}>
      <input
        type="checkbox"
        id="checkbox"
        name="checkmarkbox"
        value="check"
        checked={state === "checked"}
        ref={checkboxRef}
        disabled={disabled}
        onChange={handleChange}
        className={`${styles.input}`}
        // className={`${styles.input}`}
      />
      <label htmlFor="checkbox" className={styles.label}>
        Label
      </label>
    </div>
  );
}
