import React, { FC } from "react";

interface TableWrapperProps {
  children: any;
}

const TableWrapper: FC<TableWrapperProps> = ({ children }) => {
  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Key
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Summary
            </th>
            <th scope="col" className="px-6 py-3">
              Severity
            </th>
            <th scope="col" className="px-6 py-3">
              <a href={`#`} className="sr-only">
                Link
              </a>
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableWrapper;
