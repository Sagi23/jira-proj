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
    <div className="flex align-middle justify-center w-64 h-60 border border-gray-400 bg-white p-5 rounded-lg">
      <Link
        href="/projects/[id]"
        as={`/projects/${id}`}
        className="w-full flex flex-col justify-between"
      >
        <div>
          <img
            src={image}
            alt={name}
            width={48}
            height={48}
            className="m-auto"
          />
          <p className="text-center text-lg underline text-blue-600 mt-4">
            {name}
          </p>
        </div>
        <div>
          <p>Key: {jiraKey}</p>
          {categoryName && <p>Category: {categoryName}</p>}
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
