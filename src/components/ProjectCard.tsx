import React, { FC } from "react";
import Link from "next/link";
import "../app/globals.css";

interface ProjectCardProps {
  name: string;
  jiraKey: string;
  image: string;
  categoryName: string;
  id: number;
}

const ProjectCard: FC<ProjectCardProps> = ({
  name,
  jiraKey,
  image,
  id,
  categoryName,
}) => {
  return (
    <div className="flex align-middle justify-center p-4 w-64 h-60 border border-black ">
      <Link href="/projects/[id]" as={`/projects/${id}`} className="w-full">
        <img src={image} alt={name} width={48} height={48} className="m-auto" />
        <p className="text-center underline text-blue-600  m-4">{name}</p>
        <p>Key: {jiraKey}</p>
        {categoryName && <p>Category: {categoryName}</p>}
      </Link>
    </div>
  );
};

export default ProjectCard;
