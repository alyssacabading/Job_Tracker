"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Chevron icons
import AddApplicationModal from "./AddApplicationModal";

export default function Applications() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Toggle the accordion open/close
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Open the modal
  const openModal = () => {
    setIsAddModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-screen-md mx-auto flex flex-col items-center pt-10">
      <div className="flex justify-end w-full mb-4">
        <button
          onClick={openModal}
          className="bg-customblue hover:bg-custombluehover text-white p-2.5 rounded-lg mb-4 font-bold transition ease-in-out"
          >
            Add Application
        </button>
      </div>

      <div
        className="w-full bg-white rounded-lg shadow-2xl p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-customdarkgrey text-xl font-bold">Notion Internship</h2>
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

      <AddApplicationModal isOpen={isAddModalOpen} onClose={closeModal} />
    </div>
  );
}
