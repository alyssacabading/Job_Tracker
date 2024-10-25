"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Chevron icons

export default function Applications() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the accordion open/close
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center pt-10">
      <div
        className="w-1/2 bg-white rounded-lg shadow-2xl p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-customdarkgrey text-xl">Notion Internship</h2>
          <div className="text-customdarkgrey">
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>

        {isOpen && (
          <div className="text-left text-customdarkgrey mt-4">
            <p className="text-lg mb-2">
              <strong>Status:</strong> Interview
            </p>
            <p className="text-lg mb-2">
              <strong>Skills:</strong> React
            </p>
            <p className="text-lg">
              <strong>Relevant Contacts:</strong> Andrew Atef
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
