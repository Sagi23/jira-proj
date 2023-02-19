import React, { FC } from "react";
import HighlightCardWrapper from "./HighlightCardWrapper";
import HighlightCard from "./HighlightCard";

interface SeveritySummaryProps {
  data: any;
}

const SeveritySummary: FC<SeveritySummaryProps> = ({ data }) => {
  return (
    <div>
      <HighlightCardWrapper title="Severity Summary">
        <div className="sm:flex sm:gap-4 sm:flex-wrap lg:flex-nowrap">
          <HighlightCard
            amount={data.totalIssues}
            title="Total Issues"
            total={data.totalIssues}
          />
          <HighlightCard
            amount={data.totalBlocker}
            title="Total Blockers"
            total={data.totalIssues}
          />
          <HighlightCard
            amount={data.totalCritical}
            title="Total Criticals"
            total={data.totalIssues}
          />
          <HighlightCard
            amount={data.totalMajor}
            title="Total Majors"
            total={data.totalIssues}
          />
          <HighlightCard
            amount={data.totalMinor}
            title="Total Minors"
            total={data.totalIssues}
          />
          <HighlightCard
            amount={data.totalCosmetic}
            title="Total Cosemtic"
            total={data.totalIssues}
          />
        </div>
      </HighlightCardWrapper>
    </div>
  );
};

export default SeveritySummary;
