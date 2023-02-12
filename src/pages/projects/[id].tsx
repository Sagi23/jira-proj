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

        setData(jsonData);
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
        <h3>{data && data.total}</h3>
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
