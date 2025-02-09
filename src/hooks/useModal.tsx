import { Modal } from "@/overlay/Modal";
import { useOverlay } from "@/overlay/useOverlay";
import { ReactNode } from "react";

export const useModal = () => {
  const overlay = useOverlay();

  return {
    open: (content: (close: () => void) => ReactNode) => {
      overlay.open(({ isOpen, close, isRemoving }) => (
        <Modal isOpen={isOpen} close={close} isRemoving={isRemoving}>
          {content(close)}
        </Modal>
      ));
    },
    close: overlay.close,
  };
};
