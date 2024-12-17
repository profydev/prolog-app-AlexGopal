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
      <FormControl
        sx={{
          width: "100%", // Allow the component to stretch
          boxSizing: "border-box", // Include padding in width calculations
        }}
      >
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          value={value}
          onChange={handleChange}
          label={label}
          {...props}
          sx={{
            paddingRight: "14px", // Match the left padding, we need this because we're using mui so the components come with their own padding
            // and we need to offset this
            boxSizing: "border-box", // Prevent overflow by including padding in width
            // so basically without this if we said width: 100px, and then added for example 5 px of padding
            // on the right and left we would get 110px of width, with border-box the padding is included in the width
            // calculation so we would still have 100px width
            width: "100%", // Stretch to full width of parent
            // without this the child might not stretch to the full width of the parent, it will only take up as much width
            // as its content requires
          }}
        >
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
