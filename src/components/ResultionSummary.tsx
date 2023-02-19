import React, { FC } from "react";
import HighlightCard from "./HighlightCard";
import HighlightCardWrapper from "./HighlightCardWrapper";
import SeveritySelect from "./SeveritySelect";

interface ResultionSummaryProps {
  data: any;
  setSeverity: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const ResultionSummary: FC<ResultionSummaryProps> = ({
  data,
  setSeverity,
  isLoading,
}) => {
  return (
    <div>
      <HighlightCardWrapper title="Resultion Summary">
        <SeveritySelect setSeverity={setSeverity} isLoading={isLoading} />
        <div className="sm:flex sm:space-x-4 sm:flex-wrap lg:flex-nowrap">
          <HighlightCard
            amount={data.totalOpen}
            title="Total Open"
            total={data.total}
          />
          <HighlightCard
            amount={data.totalreopened}
            title="Total Reopened"
            total={data.total}
          />
          <HighlightCard
            amount={data.totalInProgress}
            title="Total In Progress"
            total={data.total}
          />
          <HighlightCard
            amount={data.totalCustomerApproval}
            title="Total Customer Approval"
            total={data.total}
          />
          <HighlightCard
            amount={data.totalClosed}
            title="Total Closed"
            total={data.total}
          />
        </div>
      </HighlightCardWrapper>
    </div>
  );
};

export default ResultionSummary;
