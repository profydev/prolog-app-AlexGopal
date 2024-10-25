import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "./select-component.module.scss";

type CustomSelectProps = SelectProps & {
  label?: string;
};

export function SelectComponent({
  label = "Age",
  ...props
}: CustomSelectProps) {
  const [age, setAge] = useState<string | number>("");

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setAge(event.target.value as string | number); // Cast value to string | number
  };

  return (
    <div className={styles.container}>
      <FormControl sx={{ width: "15%" }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
          label={label}
          {...props}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
