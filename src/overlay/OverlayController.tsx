import {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { CreateOverlayElement, OverlayControlRef } from "./useOverlay";
import { useOverlayContext } from "./OverlayProvider";
import { Overlay } from "./Overlay";
import useKeyPress from "@/hooks/useKeyPress";
interface Props {
  overlayContent: CreateOverlayElement;
  id: string;
}

export const OverlayController = forwardRef(
  (
    { overlayContent: OverlayContent, id }: Props,
    ref: Ref<OverlayControlRef>
  ) => {
    const { unmount } = useOverlayContext();
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const handleOverlayClose = useCallback(() => {
      setIsRemoving(true);
      setTimeout(() => {
        setIsOverlayOpen(false);
        unmount(id);
      }, 80);
    }, [id, unmount]);

    useKeyPress("Escape", handleOverlayClose);
    useImperativeHandle(ref, () => {
      return { close: handleOverlayClose };
    });

    useEffect(() => {
      requestAnimationFrame(() => {
        setIsOverlayOpen(true);
      });
    }, []);

    return (
      <Overlay
        isOpen={isOverlayOpen}
        close={handleOverlayClose}
        isRemoving={isRemoving}
      >
        <OverlayContent close={handleOverlayClose} />
      </Overlay>
    );
  }
);
OverlayController.displayName = "OverlayController";
