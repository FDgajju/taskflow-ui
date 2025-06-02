import React, { type ReactNode } from "react";
import { colorClassMapTaskStatus } from "../constants/colorMap";

type HeadingCardProps = {
  icon: React.ReactNode;
  highlightText: string;
  heading: string;
  text: string;
  color?: string;
  children?: ReactNode;
  className?: string;
  highlightBg?: string;
  highlightTextColor?: string;
};

const HeadingCard: React.FC<HeadingCardProps> = ({
  icon,
  highlightText,
  heading,
  text,
  color = "status-done",
  children,
  className = "",
}) => {

  return (
    <article className="rounded-3xl p-8 flex flex-col justify-center items-start gap-4 text-main bg-secondary-bg">
      <div
        aria-hidden="true"
        className={`${colorClassMapTaskStatus[color]} p-1.5 rounded-full`}
      >
        <span role="img" aria-label="Icon">
          {icon}
        </span>
      </div>
      <div className="flex flex-col justify-start items-start gap-1">
        <p
          className={` text-sm bg-btn-secondary text-btn-primary font-semibold py-0.5 px-2 rounded-lg`}
        >
          {highlightText}
        </p>
        <p className="text-main text-xl font-bold">{heading}</p>
        <p className="text-gray-text text-sm italic font-medium">{text}</p>
      </div>
      <div className={className}>{children}</div>
    </article>
  );
};

export default React.memo(HeadingCard);
