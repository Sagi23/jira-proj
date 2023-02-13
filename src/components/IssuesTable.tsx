import React, { FC } from "react";

interface IssuesTableProps {
  issueId: string;
  type: string;
  summary: string;
  severity: string;
}

const IssuesTable: FC<IssuesTableProps> = ({
  issueId,
  type,
  summary,
  severity,
}) => {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {issueId}
        </th>
        <td className="px-6 py-4">{type}</td>
        <td className="px-6 py-4">{summary}</td>
        <td className="px-6 py-4">{severity}</td>
        <td className="px-6 py-4 text-right">
          <a
            href={`https://jira-soft.ngsoft.com/issue/${issueId}`}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Link
          </a>
        </td>
      </tr>
    </>
  );
};

export default IssuesTable;
