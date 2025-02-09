import { useEffect, useRef, useState } from "react";
import { useOverlayContext } from "./OverlayProvider";
import { OverlayController } from "./OverlayController";

export interface OverlayControlRef {
  close: () => void;
}
export type CreateOverlayElement = (props: {
  isOpen: boolean;
  close: () => void;
  isRemoving: boolean;
}) => JSX.Element;

let elementId = 1;
export function useOverlay() {
  const { mount, unmount } = useOverlayContext();
  const [id] = useState(() => String(elementId++));
  const overlayRef = useRef<OverlayControlRef | null>(null);

  useEffect(() => {
    return () => unmount(id);
  }, [id]);

  return {
    open: (overlayContent: CreateOverlayElement) => {
      mount(
        id,
        <OverlayController
          ref={overlayRef}
          id={id}
          overlayContent={overlayContent}
        />
      );
    },
    close: () => {
      overlayRef.current?.close();
    },
  };
}
