// import styles from "./contact-modal.module.scss"
// export function ContactModal() {
//     return (
//         <Modal trigger = {({open}) =>
//         <button
//         className={styles.contactButton}
//         onClick={() =>
//           alert(
//             "Implement this in Challenge 2 - Modal:\n\nhttps://profy.dev/rjs-challenge-modal",
//           )
//         }
//       >
//         {/* eslint-disable-next-line @next/next/no-img-element */}
//         <img src="/icons/message.svg" alt="Contact" />
//       </button>
//       </Modal>
//     )
// }

// import { NewButton, Modal } from "@features/ui";
// import messageIcon from "@icons/message.svg";
// import styles from "./contact-modal.module.scss";

// export function ContactModal() {
//   return (
//     <Modal
//       trigger={({ open }) => (
//         <NewButton
//           className={styles.contactButton}
//           onClick={open}
//           size="xlg"
//           color="primary"
//           iconPosition="only"
//         >
//           <img src={messageIcon} alt="Contact" />
//         </NewButton>
//       )}
//     >
//       {({ close }) => (
//         <NewButton
//           className={styles.contactButton}
//           onClick={close}
//           size="md"
//           color="primary"
//         >
//           Close
//         </NewButton>
//       )}
//     </Modal>
//   );
// }

// import { NewButton, Modal } from "@features/ui";
// // import messageIcon from "@icons/message.svg";
// // import mailIcon from "@icons/mail.svg";
// import styles from "./contact-modal.module.scss";

// export function ContactModal() {
//   return (
//     <Modal
//       trigger={({ open }) => (
//         <NewButton
//           className={styles.contactButton}
//           onClick={open}
//           size="xlg"
//           color="primary"
//           iconPosition="only"
//         >
//           <img src="/icons/check.svg" alt="Contact" />
//         </NewButton>
//       )}
//     >
//       {({ close }) => (
//       <>
//         <img src="/icons/mail.svg" alt="" />
//         <h2 className = {styles.title}>Contact Us Via Email </h2>
//         <p className = {styles.info}> Any questions? Send us an email at prolog@profy.dev. We usually answer within 24 hours.</p>
//         <div className = {styles.actions}>
//           <NewButton
//               onClick={close}
//               size="xlg"
//               color="gray"
//               iconPosition="before"
//             >
//               Cancel
//           </NewButton>
//           <NewButton
//               href = "mailto:prolog@profy.dev"
//               size="xlg"
//               color="gray"
//               iconPosition="before"
//           >
//               Open Email App
//           </NewButton>
//         </div>
//       </>
//     )}
//     </Modal>
//   );
// }

import { NewButton, Modal } from "@features/ui";
import styles from "./contact-modal.module.scss";

export function ContactModal() {
  return (
    <Modal
      trigger={({ open }) => (
        // <NewButton
        //   className={styles.contactButton}
        //   onClick={open}
        //   size="xlg"
        //   color="primary"
        //   iconPosition="only"
        //   hideIcon={true} // Hides the icon in ContactModal
        // />
        <NewButton
          className={styles.contactButton}
          onClick={open}
          size="xlg"
          color="primary"
          iconPosition="only"
          iconSrc="/icons/message.svg" // Use iconSrc prop to specify the icon
          iconAlt="Contact" // Optional: Accessible text for the icon
        />
      )}
    >
      {({ close }) => (
        <>
          <img
            src="/icons/mail.svg"
            alt="Mail Icon"
            className={styles.mailIcon}
          />
          <h2 className={styles.title}>Contact Us Via Email</h2>
          <p className={styles.info}>
            Any questions? Send us an email at prolog@profy.dev. We usually
            answer within 24 hours.
          </p>
          <div className={styles.actions}>
            <NewButton
              onClick={close}
              size="xlg"
              color="gray"
              iconPosition="before"
              hideIcon={true} // Ensures no icon for "Cancel" button
            >
              Cancel
            </NewButton>
            <NewButton
              href="mailto:prolog@profy.dev"
              size="xlg"
              color="primary"
              iconPosition="before"
              hideIcon={true} // Ensures no icon for "Open Email App" button
            >
              Open Email App
            </NewButton>
          </div>
        </>
      )}
    </Modal>
  );
}
