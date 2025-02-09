"use client";

import { useModal } from "@/hooks/useModal";
import React from "react";

function Page() {
  const modal = useModal();

  const openModal = () => {
    modal.open((close) => (
      <div>
        asd<button onClick={close}>close</button>
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
