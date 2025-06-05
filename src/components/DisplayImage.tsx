import React, { useEffect, useRef } from "react";

type DisplayImageProp = {
  url: string;
  handleClose: () => void;
};

const DisplayImage: React.FC<DisplayImageProp> = ({ url, handleClose }) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Focus the Cancel button on mount
    cancelButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center  justify-center backdrop-blur-md bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-4 flex flex-col rounded-3xl border-2 bg-secondary-bg/20 border-sidebar-selected/30 gap-2"
      >
        <button
          ref={cancelButtonRef}
          onClick={handleClose}
          className="py-0.5 px-1.5 bg-status-overdue-secondary font-bold text-status-overdue focus:ring-2 focus:right-status-overdue block w-fit cursor-pointer rounded-lg text-xs  self-end"
        >
          Close
        </button>

        <img
          className="xl:max-h-[800px] md:max-h-[700px] max-h-[300px] sm:max-h-[450px] rounded-2xl shadow-2xl"
          src={url}
          alt="Attachment image"
        />
      </div>
    </div>
  );
};

export default DisplayImage;
