import TextField, { TextFieldProps } from "@mui/material/TextField";
import styles from "./input.module.scss";

type InputProps = TextFieldProps;

export function Input(props: InputProps) {
  return (
    <div className={styles.container}>
      <TextField
        {...props} // Spread all TextFieldProps to allow for customization
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
      />
    </div>
  );
}
