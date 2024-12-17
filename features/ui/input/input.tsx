import TextField, { TextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./input.module.scss";

type InputProps = TextFieldProps;

export function Input(props: InputProps) {
  return (
    <div className={styles.container}>
      <TextField
        {...props}
        id="outlined-basic"
        label="Project Name"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            padding: "8px 12px", // Match Select padding // we need to add this to offset the padding that the components come with because we used mui
            height: "56px", // Match Select height
            boxSizing: "border-box",
          },
        }}
        sx={{
          // see select-component.tsx for an expanation on width and boxsizing
          width: "100%",
          boxSizing: "border-box",
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
