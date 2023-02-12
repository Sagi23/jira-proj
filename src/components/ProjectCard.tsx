import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  name: string;
  jiraKey: string;
  totalIssues: number;
  image: string;
  id: number;
}

const ProjectCard: FC<ProjectCardProps> = ({
  name,
  jiraKey,
  totalIssues,
  image,
  id,
}) => {
  return (
    <>
      <Link href="/projects/[id]" as={`/projects/${id}`}>
        <div
          style={{
            width: "250px",
            height: "250px",
            border: "1px solid black",
          }}
        >
          <div>
            <img src={image} alt={name} width={48} height={48} />
            {jiraKey}
          </div>
          <h2>{name}</h2>
          <p>Total Issues: {totalIssues}</p>
        </div>
      </Link>
    </>
  );
};

export default ProjectCard;
