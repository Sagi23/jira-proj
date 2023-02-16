import React, { FC } from "react";
import "../app/globals.css";
import Link from "next/link";

interface SearchResultsProps {
  name: string;
  avatar: string;
  jiraKey: string;
}

const SearchResults: FC<SearchResultsProps> = ({ name, avatar, jiraKey }) => {
  return (
    <Link href={`/projects/${jiraKey}`}>
      <li className="w-52 hover:bg-gray-200 hover:cursor-pointer pl-4 py-2 rounded-lg">
        <div className="flex gap-2 items-center z-50">
          <img src={avatar} alt={name} height={38} width={38} />
          <p>{name}</p>
        </div>
      </li>
    </Link>
  );
};

export default SearchResults;
