import React, { useEffect, useRef } from "react";
import Button from "./Button";
import { ThreeDot } from "react-loading-indicators";

type TaskDeleteConfirmationProp = {
  title?: string;
  id: string;
  onConfirm: () => void;
  onCancel: () => void;
  deleting: boolean;
};

const TaskDeleteConfirmation: React.FC<TaskDeleteConfirmationProp> = ({
  title,
  id,
  onConfirm,
  onCancel,
  deleting,
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Focus the Cancel button on mount
    cancelButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div className="text-main fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="min-w-90 bg-primary-bg p-4 rounded-xl shadow-lg flex flex-col gap-4">
        <p className="text-main py-2 border-b-2 border-sidebar-selected">
          {title || "Delete Confirmation"}
        </p>
        <p>
          Are you sure you what to delete this{" "}
          <span className="underline font-semibold">{id}</span> task
        </p>

        <div className="flex gap-3 justify-end">
          <Button
            reference={cancelButtonRef}
            style="bg-btn-secondary focus:ring-2 focus:ring-btn-primary"
            type="button"
            onClick={onCancel}
          >
            <span className="text-btn-primary">Cancel</span>
          </Button>
          <Button type="submit" style="bg-status-overdue" onClick={onConfirm}>
            {deleting ? (
              <ThreeDot color="#fff" size="small" text="" textColor="" />
            ) : (
              "Confirm"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDeleteConfirmation;
