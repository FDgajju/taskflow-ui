import React, {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from "react";
import H2 from "./H2";
import DisplayImage from "./DisplayImage";
import axios from "axios";
import { apiEndpoint } from "../constants/env";
import DocumentImage from "./DocumentImage";
import type { DocumentT } from "../types/task";
import toast from "react-hot-toast";

const Attachments: React.FC<{
  attachedDocuments: DocumentT[];
  taskId: string;
}> = ({ attachedDocuments, taskId }) => {
  const [showImage, setShowImage] = useState<boolean>(false);
  const [files, setFiles] = useState<DocumentT[]>([]);

  const visibleFiles = React.useMemo(() => files, [files]);

  const [imageUrl, setImageUrl] = useState<string>("");

  const [isDragging, setIsDragging] = useState<boolean>(false);

  console.log(attachedDocuments);

  useEffect(() => {
    setFiles(attachedDocuments.map((a: DocumentT) => ({ show: true, ...a })));
  }, [attachedDocuments]);

  const uploadFile = useCallback(
    async (fileToUpload: File | null) => {
      const existingFile = files.find(
        (f) => f.originalname === fileToUpload?.name
      );

      if (existingFile && existingFile.maskImageUrl) {
        URL.revokeObjectURL(existingFile.maskImageUrl);
      }

      try {
        if (!fileToUpload) return;

        const formData = new FormData();

        formData.append("document", fileToUpload as File);
        formData.append("for", String(taskId));

        const resp = await axios.post(`${apiEndpoint}/document`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (resp.status === 200) {
          setFiles((prev) => [
            ...prev.filter(
              (f) => f.originalname !== resp.data.data.originalname
            ),
            { show: true, ...resp.data.data },
          ]);
        } else {
          setFiles((prev) => [
            ...prev.filter((f) => f.originalname !== fileToUpload.name),
          ]);

          toast.error(
            resp.data.error || "Failed to upload file. Please try again."
          );
        }
      } catch (error) {
        console.log(error);
        setFiles((prev) => [
          ...prev.filter((f) => f.originalname !== fileToUpload?.name),
        ]);
        if (error instanceof axios.AxiosError) {
          toast.error(error.response?.data.error || error.message);
        } else {
          toast.error("An unknown error occurred while uploading the file.");
        }
      }
    },
    [taskId, setFiles, files]
  );

  const handleOnFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files?.[0]) {
      setFiles((prev: DocumentT[]) => [
        ...prev,
        {
          maskImageUrl: URL.createObjectURL(e.target.files![0]),
          _id: `${Date.now()}-${Math.trunc(Math.random() * 1000)}`,
          originalname: e.target.files![0].name,
        },
      ]);
      uploadFile(e.target?.files?.[0]);
      e.target.value = "";
    } else {
      console.log("No file chosen");
    }
  };

  const handleImageClick = useCallback((url: string) => {
    setShowImage(true);
    setImageUrl(url);
  }, []);

  const handleDocumentDelete = (id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f._id === id);
      if (fileToRemove?.maskImageUrl) {
        URL.revokeObjectURL(fileToRemove.maskImageUrl);
      }
      return prev.filter((f) => f._id !== id);
    });
  };

  // drag and drop handlers
  const handleDragging = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];

      setFiles((prev: DocumentT[]) => [
        ...prev,
        {
          maskImageUrl: URL.createObjectURL(file),
          _id: `${Date.now()}-${Math.trunc(Math.random() * 1000)}`,
          originalname: file.name,
        },
      ]);
      uploadFile(file);
    }
  };

  return (
    <div className="py-2"  aria-label="Attachments section">
      <H2 className="p-2" text="Attachments" />

      <div
        aria-label="Drop file here to upload"
        className="relative bg-secondary-bg rounded-3xl flex flex-col items-center p-4 gap-3 border-1 border-sidebar-selected"
        onDragOver={handleDragging}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className="absolute inset-0 bg-btn-secondary/65 border-1 border-btn-primary rounded-3xl flex items-center justify-center pointer-events-none text-btn-primary font-bold text-xl z-10">
            Drop file here to upload!
          </div>
        )}
        {visibleFiles && visibleFiles?.length !== 0 && (
          <div className="flex flex-nowrap gap-2 justify-start w-full items-center overflow-x-auto">
            {showImage && (
              <DisplayImage
                handleClose={() => {
                  setShowImage(false);
                  setImageUrl("");
                }}
                url={imageUrl}
              />
            )}
            {visibleFiles?.map((f) => (
              <div
                key={f._id || f.name || f.originalname}
                className="min-w-[200px] relative p-2"
              >
                <DocumentImage
                  key={f._id || f.name || f.originalname}
                  document={f}
                  className=""
                  handleImageClick={handleImageClick}
                  handleDocumentDelete={handleDocumentDelete}
                />
              </div>
            ))}
          </div>
        )}

        <div className="text-sm text-gray-text flex gap-2">
          {!attachedDocuments.length && <span>There's no attachments</span>}
          <label
            htmlFor="files"
            className="font-bold text-btn-primary cursor-pointer"
          >
            Add {!!attachedDocuments.length && "more"} attachments
          </label>
          <input
            type="file"
            onChange={handleOnFileUpload}
            id="files"
            name="file"
            className="hidden"
            // multiple
          />
        </div>
      </div>
    </div>
  );
};

export default Attachments;
