import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../../app/globals.css";
import Loader from "@/components/Loader";
import HighlightCard from "@/components/HighlightCard";
import IssuesTable from "@/components/IssuesTable";
import TableWrapper from "@/components/TableWrapper";
import SeveritySelect from "@/components/SeveritySelect";
import Pagination from "@/components/Pagination";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { baseURL, getLocalStorageData } from "@/helper";
import HighlightCardWrapper from "@/components/HighlightCardWrapper";
import SeveritySummary from "@/components/SeveritySummary";
import ResultionSummary from "@/components/ResultionSummary";

interface ProjectProps {}

const Project: FC<ProjectProps> = ({}) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null | any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [severity, setSeverity] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = getLocalStorageData("auth");

  const router = useRouter();
  const { id: project_id } = router.query;

  const apiUrl = `${baseURL}/jira/search/${project_id}/${severity}/${auth}?page=${currentPage}`;

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth, router]);

  useEffect(() => {
    if (
      typeof project_id === "string" &&
      project_id !== project_id.toUpperCase()
    ) {
      router.replace(`/projects/${project_id.toUpperCase()}`);
    }
  }, [project_id, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!project_id) {
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data from Jira API");
        }

        const jsonData = await response.json();
        const {
          data,
          total_issues: totalIssues,
          total_blocker: totalBlocker,
          total_critical: totalCritical,
          total_major: totalMajor,
          total_minor: totalMinor,
          total_cosmetic: totalCosmetic,
          total_open: totalOpen,
          total_closed: totalClosed,
          total_reopened: totalreopened,
          total_in_progress: totalInProgress,
          total_customer_approval: totalCustomerApproval,
          project_name: projectName,
        } = jsonData;

        setData({
          ...JSON.parse(data),
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
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [apiUrl, severity, currentPage, project_id]);

  const projectsData = getLocalStorageData("projectsData");

  const currentProject =
    projectsData &&
    JSON.parse(projectsData)?.find(
      (p: { key: string | string[] | undefined }) => p.key === project_id
    );

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (!data) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <title>{data.projectName}</title>
        <meta property="og:title" content={data.projectName} key="title" />
      </Head>
      {isLoading && <Loader />}
      <Navbar />
      <div className="w-3/4 mx-auto pt-12 mb-20">
        <h1 className="text-4xl text-center font-semibold mb-12">
          {currentProject?.name}
        </h1>
        <SeveritySummary data={data} />
        <ResultionSummary
          data={data}
          isLoading={isLoading}
          setSeverity={setSeverity}
        />
        {data?.issues.length > 0 ? (
          <>
            <TableWrapper>
              {data.issues.map((issue: any) => (
                <IssuesTable
                  key={issue.key}
                  issueId={issue.key}
                  type={issue.fields.issuetype?.name}
                  summary={issue.fields.summary}
                  severity={issue.fields.customfield_10200?.value}
                />
              ))}
            </TableWrapper>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalIssues={data.total}
              isLoading={isLoading}
            />
          </>
        ) : (
          <p className="text-xl text-center">No Issues Were Found!</p>
        )}
      </div>
    </>
  );
};

export default Project;
