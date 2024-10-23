import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "./select-component.module.scss";

type SelectProps = Record<string, never>;

export function SelectComponent(props: SelectProps) {
  const [age, setAge] = useState<string | number>("");

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    setAge(event.target.value as number); // Update state with the selected value
  };

  return (
    <div className={styles.container} {...props}>
      {" "}
      {/* Apply container styles here */}
      <FormControl sx={{ width: "15%" }}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
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
