import React from "react";

export interface GroupButtonProps {
  text: string;
  activeButton: string;
}

const GroupButton: React.FC<GroupButtonProps> = ({ text, activeButton }) => {
  return (
    <button
      className={`text-sm font-medium rounded-full p-2 px-4 hover:bg-green-700 ${activeButton === "myGroups" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`}
    >
      {text}
    </button>
  );
};

export default GroupButton;
