import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "./select-component.module.scss";

type Option = {
  label: string; // Displayed text for the option
  value: string; // Value sent to the callback
};

type CustomSelectProps = SelectProps & {
  label: string; // Label for the dropdown
  value: string; // Currently selected value
  options: Option[]; // Array of dropdown options
  onChange: (value: string) => void; // Callback when an option is selected
};

export function SelectComponent({
  label,
  value,
  options,
  onChange,
  ...props
}: CustomSelectProps) {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value as string); // Explicitly cast to string
  };

  return (
    <div className={styles.container}>
      <FormControl style={{ width: "220px", minWidth: "220px" }}>
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          value={value}
          onChange={handleChange}
          label={label}
          {...props}
        >
          {/* Dynamically render the options */}
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
