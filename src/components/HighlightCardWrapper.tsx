import React, { FC } from "react";

interface HighlightCardWrapperProps {
  children: any;
  title: string;
}

const HighlightCardWrapper: FC<HighlightCardWrapperProps> = ({
  children,
  title,
}) => {
  return (
    <div className="h-min max-w-full mx-4 py-6 sm:mx-auto">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}
    </div>
  );
};

export default HighlightCardWrapper;
