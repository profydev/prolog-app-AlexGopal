import { useState } from "react";
import {
  Dialog,
  Modal as AriaModal,
  ModalOverlay,
} from "react-aria-components";
import styles from "./modal.module.scss";
import classNames from "classnames";

type ModalControlProps = {
  open: () => void;
  close: () => void;
};

type ModalRenderCallback = (props: ModalControlProps) => React.ReactNode;

type ModalProps = {
  className?: string;
  trigger: ModalRenderCallback;
  children: ModalRenderCallback;
};

export function Modal({ className, trigger, children }: ModalProps) {
  const [isOpen, setOpen] = useState(false);
  const controlProps = {
    open: () => setOpen(true),
    close: () => setOpen(false),
  };

  return (
    <>
      {trigger(controlProps)}
      <ModalOverlay
        className={styles.overlay}
        isDismissable
        isOpen={isOpen}
        onOpenChange={setOpen}
      >
        <AriaModal>
          <Dialog className={classNames(styles.dialog, className)}>
            {children(controlProps)}
          </Dialog>
        </AriaModal>
      </ModalOverlay>
    </>
  );
}
