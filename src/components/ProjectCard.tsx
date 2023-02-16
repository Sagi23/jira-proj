import React, { FC, useState } from "react";
import Link from "next/link";
import "../app/globals.css";

interface ProjectCardProps {
  name: string;
  jiraKey: string;
  image: string;
  categoryName: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  name,
  jiraKey,
  image,
  categoryName,
}) => {
  return (
    <div className="flex align-middle justify-center w-64 h-60 border border-gray-200 shadow bg-white p-5 rounded-lg hover:bg-gray-100">
      <Link
        href="/projects/[id]"
        as={`/projects/${jiraKey}`}
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
