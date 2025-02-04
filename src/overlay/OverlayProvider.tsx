import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface IOverlayContext {
  mount(id: string, element: ReactNode): void;
  unmount(id: string): void;
}

const OverlayContext = createContext<IOverlayContext | null>(null);

export const useOverlayContext = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay is only available within OverlayProvider.");
  }
  return context;
};

export function OverlayProvider({ children }: PropsWithChildren) {
  const [overlay, setOverlay] = useState<Map<string, ReactNode>>(new Map());
  console.log(overlay);

  const mount = useCallback((id: string, element: ReactNode) => {
    setOverlay((overlay) => {
      const clone = new Map(overlay);
      clone.set(id, element);
      return clone;
    });
  }, []);

  const unmount = (id: string) => {
    setOverlay((overlay) => {
      const clone = new Map(overlay);
      clone.delete(id);
      return clone;
    });
  };

  const context = { mount, unmount };
  return (
    <OverlayContext.Provider value={context}>
      {children}
      {[...overlay.entries()].map(([id, element]) => (
        <React.Fragment key={id}>{element}</React.Fragment>
      ))}
    </OverlayContext.Provider>
  );
}
