"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Chevron icons
import AddApplicationModal from "./AddApplicationModal";

const defaultApplications = [
  {
    id: 1,
    title: "Backend Internship",
    company: "Notion",
    status: "Interview",
    skills: "React",
    contacts: "Andrew Atef",
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Google",
    status: "Applied",
    skills: "JavaScript, Python",
    contacts: "John Doe",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Facebook",
    status: "Phone Screen",
    skills: "Python, SQL",
    contacts: "Jane Smith",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Amazon",
    status: "Offer",
    skills: "Product Management",
    contacts: "Mark Johnson",
  },
];

export default function Applications() {
  const [openAccordions, setOpenAccordions] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [apps, setApps] = useState(defaultApplications);

  const toggleAccordion = (id: number) => {
    setOpenAccordions((prev) =>
      prev.includes(id) ? prev.filter((accordionId) => accordionId !== id) : [...prev, id]
    );
  };

  // Open the modal
  const openModal = () => {
    setIsAddModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsAddModalOpen(false);
  };

  const addApplication = (application: any) => {
    setApps((prev) => [
      ...prev,
      { ...application, id: prev.length + 1}
    ]);
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

      {apps.map((application) => (
        <div
          key={application.id}
          className="w-full bg-white rounded-lg shadow-xl p-4 cursor-pointer mb-5"
          onClick={() => toggleAccordion(application.id)}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-customdarkgrey text-xl font-bold">{application.title} @ {application.company}</h2>
            <div className="text-customdarkgrey">
              {openAccordions.includes(application.id) ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>

          {openAccordions.includes(application.id) && (
            <div className="text-left text-customdarkgrey mt-4">
              <p className="text-lg mb-2">
                <strong>Status:</strong> {application.status}
              </p>
              <p className="text-lg mb-2">
                <strong>Skills:</strong> {application.skills}
              </p>
              <p className="text-lg">
                <strong>Relevant Contacts:</strong> {application.contacts}
              </p>
            </div>
          )}
        </div>
      ))}

      <AddApplicationModal isOpen={isAddModalOpen} onClose={closeModal} addApplication={addApplication} />
    </div>
  );
}
