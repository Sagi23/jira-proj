import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface ProjectProps {}

const Project: FC<ProjectProps> = ({}) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null | any>(null);
  const [currentPage, setCurrentPage] = useState<number>(2);

  const router = useRouter();
  const { id: project_id } = router.query;

  const apiUrl = `http://localhost:5000/jira/search/${project_id}?page=${currentPage}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        const totalOpen = jsonData.total_open;
        const totalClosed = jsonData.total_closed;
        const totalreopened = jsonData.total_reopened;
        const totalInProgress = jsonData.total_in_progress;
        const totalCustomerApproval = jsonData.total_customer_approval;

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
        });
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return (
    <div>
      <div>
        <h3>{data && data.totalIssues}</h3>
        <h3>{data && data.totalBlocker}</h3>
        <h3>{data && data.totalCritical}</h3>
        <h3>{data && data.totalMajor}</h3>
        <h3>{data && data.totalMinor}</h3>
        <br />
        <h3>{data && data.totalOpen}</h3>
        <h3>{data && data.totalClosed}</h3>
        <h3>{data && data.totalreopened}</h3>
        <h3>{data && data.totalInProgress}</h3>
        <h3>{data && data.totalCustomerApproval}</h3>
        <ul>
          {data && data.issues ? (
            data.issues.map((issue: any) => (
              <li key={issue.key}>{issue.fields.summary}</li>
            ))
          ) : (
            <p>No data available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Project;
