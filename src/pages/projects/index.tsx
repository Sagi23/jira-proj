import ProjectCard from "@/components/ProjectCard";
import { NextPage } from "next";
import { useEffect, useState } from "react";

// const jql = encodeURIComponent("project=PHD&startAt=0&maxResults=1");

const Projects: NextPage = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null | any>(null);
  const [currentPage, setCurrentPage] = useState<number>(2);

  const apiUrl = `http://localhost:5000/jira/project?page=${currentPage}`;

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
  console.log(typeof data);
  console.log(data);
  return (
    <div>
      <div>
        <h3>{data && data.total}</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {data &&
            data.map((proj: any) => (
              <div key={proj.key}>
                <ProjectCard
                  key={proj.id}
                  name={proj.name}
                  jiraKey={proj.key}
                  totalIssues={40}
                  image={proj.avatarUrls["48x48"]}
                  id={proj.id}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
