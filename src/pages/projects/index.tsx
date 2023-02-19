import ProjectCard from "@/components/ProjectCard";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import "../../app/globals.css";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { baseURL, getLocalStorageData } from "@/helper";

// const jql = encodeURIComponent("project=PHD&startAt=0&maxResults=1");

const Projects: NextPage = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null | any>(null);

  const router = useRouter();

  const auth = getLocalStorageData("auth");

  const projectsData = getLocalStorageData("projectsData");

  // ToDo: change getTime to getDate
  const currentDate = new Date().getDate().toString();

  const projectsDataDate = getLocalStorageData("projectsDataDate");

  const apiUrl = `${baseURL}/jira/project/${auth}`;

  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
    if (!projectsData || projectsDataDate !== currentDate) {
      const fetchData = async () => {
        console.log("inside");

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

          setData(jsonData);
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    } else {
      setData(JSON.parse(projectsData));
    }
  }, []);

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (!data) {
    return <Loader />;
  }

  if ((data && !projectsData) || projectsDataDate !== currentDate) {
    localStorage.setItem("projectsData", JSON.stringify(data));
    localStorage.setItem("projectsDataDate", currentDate);
  }

  return (
    <>
      <Head>
        <title>All Projects</title>
        <meta property="og:title" content="All Projects" key="title" />
      </Head>
      <Navbar />
      <div className="pb-24">
        <h1 className="text-center text-4xl font-semibold mt-12">
          All Projects
        </h1>
        <div className="w-3/4 mx-auto mt-12">
          <div className="flex gap-5 flex-wrap justify-center md:justify-between">
            {data?.map((proj: any) => (
              <div key={proj.key}>
                <ProjectCard
                  key={proj.id}
                  name={proj.name}
                  jiraKey={proj.key}
                  categoryName={proj.projectCategory?.name}
                  image={proj.avatarUrls["48x48"]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
