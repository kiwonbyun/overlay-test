"use client";
import type { HTMLAttributes } from "react";
import React, { Fragment, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./overlay.module.css";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: React.ReactNode;
  isRemoving: boolean;
  close?: () => void;
}

export const Modal = ({
  isOpen,
  children,
  close,
  isRemoving,
  ...props
}: ModalProps) => {
  const html = document.documentElement;

  useEffect(() => {
    if (isOpen && html) {
      html.style.setProperty("overflow", "hidden");
    } else {
      html.style.setProperty("overflow", "auto");
    }
    return () => {
      html.style.setProperty("overflow", "auto");
    };
  }, [isOpen]);

  return createPortal(
    <Fragment>
      <div
        className={`${styles.dim} ${
          isRemoving ? styles.dimExit : styles.dimEnter
        }`}
        onClick={close}
      />
      <div
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className={`${styles.container} ${
          isRemoving ? styles.containerExit : styles.containerEnter
        }`}
        {...props}
      >
        {children}
      </div>
    </Fragment>,
    document.getElementById("modal") as HTMLElement
  );
};
