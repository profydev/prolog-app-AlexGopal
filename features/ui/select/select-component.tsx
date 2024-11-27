// original

// import React, { useState } from "react";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import styles from "./select-component.module.scss";

// type CustomSelectProps = SelectProps & {
//   label?: string;
// };

// export function SelectComponent({
//   label = "Age",
//   ...props
// }: CustomSelectProps) {
//   const [age, setAge] = useState<string | number>("");

//   const handleChange = (event: SelectChangeEvent<unknown>) => {
//     setAge(event.target.value as string | number); // Cast value to string | number
//   };

//   return (
//     <div className={styles.container}>
//       <FormControl sx={{ width: "15%" }}>
//         <InputLabel id="demo-simple-select-label">{label}</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={age}
//           onChange={handleChange}
//           label={label}
//           {...props}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <MenuItem value={10}>Ten</MenuItem>
//           <MenuItem value={20}>Twenty</MenuItem>
//           <MenuItem value={30}>Thirty</MenuItem>
//         </Select>
//       </FormControl>
//     </div>
//   );
// }

// non reuseable version

// import React from "react";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import styles from "./select-component.module.scss";

// type CustomSelectProps = SelectProps & {
//   label: string; // Label for the dropdown
//   value: string; // Current selected value
//   onChange: (value: string) => void; // Callback for when selection changes
// };

// export function SelectComponent({ label, value, onChange, ...props }: CustomSelectProps) {
//   const handleChange = (event: SelectChangeEvent<unknown>) => {
//     onChange(event.target.value as string); // Explicitly cast to string
//   };

//   return (
//     <div className={styles.container}>
//       <FormControl fullWidth>
//         <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
//         <Select
//           labelId={`${label}-select-label`}
//           id={`${label}-select`}
//           value={value}
//           onChange={handleChange} // Pass the corrected handler
//           label={label}
//           {...props}
//         >
//           <MenuItem value="">
//             <em>All</em>
//           </MenuItem>
//           <MenuItem value="resolved">Resolved</MenuItem>
//           <MenuItem value="unresolved">Unresolved</MenuItem>
//         </Select>
//       </FormControl>
//     </div>
//   );
// }

// reuseable version
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
      <FormControl style={{ width: "25%" }}>
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
