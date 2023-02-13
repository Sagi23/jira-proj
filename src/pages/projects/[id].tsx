import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../../app/globals.css";
import Loader from "@/components/Loader";
import HighlightCard from "@/components/HighlightCard";
import IssuesTable from "@/components/IssuesTable";

interface ProjectProps {}

const Project: FC<ProjectProps> = ({}) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null | any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [highlightData, setHighlightData] = useState<any[]>([]);

  const router = useRouter();
  let { id: project_id } = router.query;

  const apiUrl = `http://localhost:5000/jira/search/${project_id}?page=${currentPage}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (project_id !== undefined) {
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("sagi.twig:St123369"),
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch data from Jira API");
          }

          const jsonData = await response.json();
          const parsedData = JSON.parse(jsonData.data);
          const totalIssues = jsonData.total_issues;
          const totalBlocker = jsonData.total_blocker;
          const totalCritical = jsonData.total_critical;
          const totalMajor = jsonData.total_major;
          const totalMinor = jsonData.total_minor;
          const totalCosmetic = jsonData.total_cosmetic;
          const totalOpen = jsonData.total_open;
          const totalClosed = jsonData.total_closed;
          const totalreopened = jsonData.total_reopened;
          const totalInProgress = jsonData.total_in_progress;
          const totalCustomerApproval = jsonData.total_customer_approval;
          const projectName = jsonData.project_name;

          setData({
            ...parsedData,
            totalIssues,
            totalBlocker,
            totalCritical,
            totalMajor,
            totalMinor,
            totalOpen,
            totalClosed,
            totalreopened,
            totalInProgress,
            totalCustomerApproval,
            totalCosmetic,
            projectName,
          });

          localStorage.setItem("project_id", project_id as string);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [apiUrl]);

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (!data) {
    return <Loader />;
  }

  // if (data) {
  //   setHighlightData([
  //     {
  //       amount: data.total,
  //       title: "Total Issues",
  //       total: data.total,
  //     },
  //     {
  //       amount: data.totalBlocker,
  //       title: "Total Blockers",
  //       total: data.total,
  //     },
  //     {
  //       amount: data.totalCritical,
  //       title: "Total Criticals",
  //       total: data.total,
  //     },
  //     {
  //       amount: data.totalMajor,
  //       title: "Total Majors",
  //       total: data.total,
  //     },
  //     {
  //       amount: data.totalMinor,
  //       title: "Total Minors",
  //       total: data.total,
  //     },
  //     {
  //       amount: data.totalCosmetic,
  //       title: "Total Cosemtics",
  //       total: data.total,
  //     },
  //   ]);
  // }

  console.log(data);
  return (
    <>
      <div className="w-3/4 mx-auto mt-12 mb-20">
        <h1 className="text-4xl text-center font-semibold mb-12">
          {data.projectName}
        </h1>
        <div>
          <div className="h-min max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold">Severity Summary</h2>
            <div className="sm:flex sm:gap-4 sm:flex-wrap lg:flex-nowrap">
              <HighlightCard
                amount={data.total}
                title="Total Issues"
                total={data.total}
              />
              <HighlightCard
                amount={data.totalBlocker}
                title="Total Blockers"
                total={data.total}
              />
              <HighlightCard
                amount={data.totalCritical}
                title="Total Criticals"
                total={data.total}
              />
              <HighlightCard
                amount={data.totalMajor}
                title="Total Majors"
                total={data.total}
              />
              <HighlightCard
                amount={data.totalMinor}
                title="Total Minors"
                total={data.total}
              />
              <HighlightCard
                amount={data.totalCosmetic}
                title="Total Cosemtic"
                total={data.total}
              />
            </div>
          </div>
          <div className="h-min max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold">Resultion Summary</h2>
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
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Key
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Summary
                </th>
                <th scope="col" className="px-6 py-3">
                  Severity
                </th>
                <th scope="col" className="px-6 py-3">
                  <a href={`#`} className="sr-only">
                    Link
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.issues ? (
                data.issues.map((issue: any) => (
                  <IssuesTable
                    key={issue.key}
                    issueId={issue.key}
                    type={issue.fields.issuetype?.name}
                    summary={issue.fields.summary}
                    severity={issue.fields.customfield_10200?.value}
                  />
                ))
              ) : (
                <p>No data available</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Project;
