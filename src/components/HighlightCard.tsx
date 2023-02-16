import React, { FC } from "react";

interface HighlightCardProps {
  amount: number;
  title: string;
  total: number;
}

const HighlightCard: FC<HighlightCardProps> = ({ amount, title, total }) => {
  const percentage = (sum: number, num: number) =>
    ((num / sum) * 100).toFixed(2);

  return (
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/4 sm:my-8">
      <div className="bg-white p-5">
        <div className="sm:flex sm:items-end sm:justify-between">
          <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
            <h3 className="text-sm leading-6 font-medium text-gray-400">
              {title}
            </h3>
            <p className="text-3xl font-bold text-black">{amount}</p>
          </div>
          <div>
            {amount !== total &&
              amount !== 0 &&
              percentage(total, amount) + "%"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;
