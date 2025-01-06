import TextField, { TextFieldProps } from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import SearchIcon from "@mui/icons-material/Search";
import styles from "./input.module.scss";

type InputProps = TextFieldProps;

export function Input(props: InputProps) {
  return (
    <div className={styles.container}>
      <TextField
        {...props}
        variant="outlined"
        sx={{
          width: "100%",
          boxSizing: "border-box",
          padding: "0", // Remove internal padding
        }}
      />
    </div>
  );
}

// this version has the placeholder but i chose to have the floating label instead to keep it consistent with the drop downs
// export function Input(props: InputProps) {
//   return (
//     <div className={styles.container}>
//       <TextField
//         {...props}
//         id="outlined-basic"
//         placeholder="Project Name"
//         variant="outlined"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon />
//             </InputAdornment>
//           ),
//         }}
//       />
//     </div>
//   );
// }
