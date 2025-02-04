"use client";

import { useOverlay } from "@/overlay/useOverlay";
import React from "react";

function Page() {
  const overlay = useOverlay();

  const openModal = () => {
    overlay.open(({ close }) => {
      return (
        <div className="w-36">
          <button onClick={close}>close</button>
        </div>
      );
    });
  };
  return (
    <div>
      <button onClick={openModal}>dsad</button>
    </div>
  );
}

export default Page;
