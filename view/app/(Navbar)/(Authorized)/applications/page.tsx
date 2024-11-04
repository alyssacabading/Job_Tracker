"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import AddApplicationModal from "./AddApplicationModal";
import EditApplicationModal from "./EditApplicationModal";

// TODO: Update the Application interface to align with the backend
export interface Application {
  id: number;
  title: string;
  company: string;
  status: string;
  skills?: string;
  contacts?: string;
  salary?: string;
}

const defaultApplications: Application[] = [
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [apps, setApps] = useState(defaultApplications);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenAccordions((prev) =>
      prev.includes(id) ? prev.filter((accordionId) => accordionId !== id) : [...prev, id]
    );
  };

  // Open the add modal
  const openModal = () => {
    setIsAddModalOpen(true);
  };

  // Close the add modal
  const closeModal = () => {
    setIsAddModalOpen(false);
  };

  // Add a new application
  const addApplication = (application: Application) => {
    setApps((prev) => [
      ...prev,
      { ...application, id: prev.length + 1}
    ]);
  };

  // Open the edit modal
  const openEditModal = (application: Application) => {
    setSelectedApp(application);
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setSelectedApp(null);
    setIsEditModalOpen(false);
  };

  // Edit an existing application
  const editApplication = (application: Application) => {
    setApps((prev) => prev.map((app) => (app.id === application.id ? application : app)));
    closeEditModal();
  };

  // Delete an existing application
  const deleteApplication = (id: number) => {
    setApps((prev) => prev.filter((app) => app.id !== id));
    closeEditModal();
  };

  return (
    <div className="max-w-screen-md mx-auto flex flex-col items-center pt-10">
      {/* Add a button to open the AddApplicationModal */}
      <div className="flex justify-end w-full mb-4">
        <button
          onClick={openModal}
          className="bg-customblue hover:bg-custombluehover text-white p-2.5 rounded-lg mb-4 font-bold transition ease-in-out"
          >
            Add Application
        </button>
      </div>

      {/* Display all applications */}
      {apps.map((application) => (
        <div
          key={application.id}
          className="w-full bg-white rounded-lg shadow-xl p-4 cursor-pointer mb-5"
          onClick={() => toggleAccordion(application.id)}
        >
          {/* Display the application title and company */}
          <div className="flex justify-between items-center">
            <h2 className="text-customdarkgrey text-xl font-bold">{application.title} @ {application.company}</h2>
            <div className="text-customdarkgrey flex flex-row ">
              {/* Add an edit button to open the EditApplicationModal */}
              <FaEdit
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(application);
                }}
                className="text-xl cursor-pointer hover:text-black transition ease-in-out mr-3"
              />
              {/* Add a chevron icon to indicate the accordion state */}
              {openAccordions.includes(application.id) ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>

          {/* Display the application details */}
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

      {/* Add the AddApplicationModal and EditApplicationModal components */}
      <AddApplicationModal isOpen={isAddModalOpen} onClose={closeModal} addApplication={addApplication} />
      {selectedApp && (
        <EditApplicationModal 
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          editApplication={editApplication}
          deleteApplication={deleteApplication}
          application={selectedApp}
        />
      )}
    </div>
  );
}
