import ProjectCard from "@/components/ProjectCard";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import "../../app/globals.css";

// const jql = encodeURIComponent("project=PHD&startAt=0&maxResults=1");

const Projects: NextPage = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null | any>(null);

  const apiUrl = `http://localhost:5000/jira/project`;

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
    return <Loader />;
  }

  if (data) {
    console.log(data.map((proj: any) => proj.projectCategory?.name));
  }
  console.log(typeof data);
  console.log(data);
  return (
    <div className="pb-24">
      <h1 className="text-center text-4xl font-semibold mt-12">All Projects</h1>
      <div className="w-3/4 mx-auto mt-12">
        <div className="flex gap-5 flex-wrap justify-center">
          {data?.map((proj: any) => (
            <div key={proj.key}>
              <ProjectCard
                key={proj.id}
                name={proj.name}
                jiraKey={proj.key}
                categoryName={proj.projectCategory?.name}
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
