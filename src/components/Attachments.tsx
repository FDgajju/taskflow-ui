import React, { useState, type ChangeEvent } from "react";
import H2 from "./H2";
import DisplayImage from "./DisplayImage";

const Attachments: React.FC<{ attachments: string[] }> = ({ attachments }) => {
  const [showImage, setShowImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleOnFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files?.length) {
      console.log(e.target.files[0].name);
    } else {
      console.log("No file chosen");
    }
  };

  return (
    <section className="py-2">
      <H2 className="p-2" text="Attachments" />

      <div className="bg-secondary-bg rounded-3xl flex flex-col items-center p-4 gap-3 border-1 border-sidebar-selected">
        {attachments && attachments?.length !== 0 && (
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
            {attachments?.map((url) => (
              <div
                key={`${url}-${String(Math.random() * 1000)}`}
                className="min-w-[200px]"
              >
                <img
                  src={url}
                  className="h-[300px] object-cover rounded-2xl cursor-pointer hover:border-2 hover:border-btn-primary/50 transition-all duration-100 p-0.5"
                  alt="Attachment Image"
                  onClick={() => {
                    setShowImage(true);
                    setImageUrl(url);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="text-sm text-gray-text flex gap-2">
          {!attachments.length && <span>There's no attachments</span>}
          <label
            htmlFor="files"
            className="font-bold text-btn-primary cursor-pointer"
          >
            Add {!!attachments.length && "more"} attachments
          </label>
          <input
            type="file"
            onChange={handleOnFileUpload}
            accept=".jpg,.png,.pdf,.jpeg"
            id="files"
            className="hidden"
          />
        </div>
      </div>
    </section>
  );
};

export default Attachments;
