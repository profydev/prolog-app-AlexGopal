// export function Alert() {
//     return (
//         <div>
//             <div>Hello</div>
//             </div>
//     );
// }
import React from "react";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import styles from "./alert.module.scss";

type AlertProps = {
  children: React.ReactNode;
  variant?: "standard" | "filled" | "outlined"; // Use the allowed variants
  severity?: "error" | "warning" | "info" | "success"; // Use the allowed severities
  onActionClick?: () => void;
};

export function Alert({
  children,
  variant = "outlined",
  severity = "error",
  onActionClick,
}: AlertProps) {
  return (
    <MuiAlert
      variant={variant}
      severity={severity}
      className={styles.alertContainer}
      sx={{
        padding: "12px", // Mobile-first padding

        ".MuiAlert-icon": {
          marginTop: "3px", // Default for mobile
          transform: "translateY(6px)", // Default for mobile

          "@media (min-width: 1024px)": {
            // Desktop adjustment at 1024px and above
            marginTop: "0px",
            transform: "translateY(0px)", // Adjust for desktop
          },
        },
      }}
    >
      <span className={styles.alertText}>{children}</span>
      <Button
        className={styles.customButton}
        variant="text"
        color="error"
        endIcon={<img src="/icons/arrow-right.svg" alt="arrow right icon" />}
        onClick={onActionClick}
        sx={{
          position: "absolute",
          right: "8px", // Default for mobile
          top: "50%",
          transform: "translateY(-50%)",
          padding: "0",
          textTransform: "none",
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "20px",
          fontFamily: "Inter, sans-serif",

          img: {
            width: "20px", // Default for mobile
            transform: "translateY(1px)",

            "@media (min-width: 1024px)": {
              // Desktop adjustment at 1024px and above
              width: "24px", // Adjust for desktop
              transform: "translateY(0px)", // Adjust for desktop
            },
          },

          "@media (min-width: 1024px)": {
            // Desktop adjustments
            right: "16px", // Adjust for desktop
            fontSize: "16px", // Adjust for desktop
          },
        }}
      >
        Try again
      </Button>
    </MuiAlert>
  );
}

// export function Alert({ children, variant = "outlined", severity = "error" }: AlertProps) {
//     return (
//         <MuiAlert
//             variant={variant}
//             severity={severity}
//             className={styles.alertContainer}
//             sx={{
//                 padding: '5.5px 16px !important',  // Override padding as needed

//                 '.MuiAlert-icon': {
//                     '@media (min-width: 64em)': {
//                         marginTop: '0px',
//                         transform: 'translateY(-2px) !important',  // Desktop adjustment
//                     },
//                     '@media (max-width: 64em)': {
//                         marginTop: '3px !important',  // Mobile adjustment
//                         transform: 'translateY(2px) !important',
//                     },
//                 },
//             }}
//         >
//             <span className={styles.alertText}>
//                 {children}
//             </span>
//             <Button
//                 className={styles.customButton}
//                 variant="text"
//                 color="error"
//                 endIcon={<img src="/icons/arrow-right.svg" alt="arrow right icon" />}
//                 sx={{
//                     textTransform: 'none !important',
//                     fontSize: '14px !important',
//                     fontWeight: '500 !important',
//                     lineHeight: '20px !important',
//                     fontFamily: 'Inter, sans-serif !important',
//                 }}
//             >
//                 Try again
//             </Button>
//         </MuiAlert>
//     );
// }
