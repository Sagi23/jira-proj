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
    if (
      typeof project_id === "string" &&
      project_id !== project_id.toUpperCase()
    ) {
      router.replace(`/projects/${project_id.toUpperCase()}`);
    }
    const fetchData = async () => {
      try {
        if (project_id !== undefined) {
          setIsLoading(true);
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
          setIsLoading(false);
          localStorage.setItem("project_id", project_id as string);
        }
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
      <Navbar />
      <div className="w-3/4 mx-auto mt-12 mb-20">
        <h1 className="text-4xl text-center font-semibold mb-12">
          {currentProject?.name}
        </h1>
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
          {isLoading && <Loader />}
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
          <TableWrapper>
            {data?.issues ? (
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
          </TableWrapper>
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalIssues={data.total}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Project;
