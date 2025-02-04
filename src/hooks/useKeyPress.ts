import { useEffect, useRef } from "react";

type ModifierKey = "Alt" | "AltGraph" | "Control" | "Shift" | "Meta";
type NavigationKey =
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "End"
  | "Home"
  | "PageDown"
  | "PageUp";
type ActionKey = "Enter" | "Tab" | "Escape" | "Backspace" | "Delete" | "Space";

type KeyboardKey = ModifierKey | NavigationKey | ActionKey;

const useKeyPress = (
  targetKey: KeyboardKey,
  callback: (e: KeyboardEvent) => void
) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        savedCallback.current(e);
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [targetKey]);
};

export default useKeyPress;
