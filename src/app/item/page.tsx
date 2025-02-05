"use client";

import { useOverlay } from "@/overlay/useOverlay";
import React from "react";

function Page() {
  const overlay = useOverlay();

  const openModal = () => {
    overlay.open(() => (
      <div className="w-96">
        <div>Title</div>
        <section>Content</section>
        <button onClick={overlay.close}>close</button>
      </div>
    ));
  };
  return (
    <div>
      <button onClick={openModal}>dsad</button>
    </div>
  );
}

export default Page;
