import React, { Dispatch, FC, SetStateAction } from "react";

interface SeveritySelectProps {
  setSeverity: Dispatch<SetStateAction<string>>;
}

const severityList = [
  "All",
  "Blocker",
  "Critical",
  "Major",
  "Minor",
  "Cosmetic",
];

const SeveritySelect: FC<SeveritySelectProps> = ({ setSeverity }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeverity(e.target.value);
  };

  return (
    <div>
      <label
        htmlFor="severity"
        className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select a Severity
      </label>
      <select
        onChange={handleChange}
        id="severity"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {severityList.map((s, index) => (
          <option key={index} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeveritySelect;
