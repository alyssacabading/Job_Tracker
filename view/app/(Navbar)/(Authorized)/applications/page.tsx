"use client";

import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import AddApplicationModal from "./AddApplicationModal";
import EditApplicationModal from "./EditApplicationModal";
import { Application } from "@/app/types/job";

// TODO: Update the Application interface to align with the backend

// const defaultApplications: Application[] = [
//   {
//     id: 1,
//     title: "Backend Internship",
//     company: "Notion",
//     status: "Interview",
//     skills: "React",
//     contacts: "Andrew Atef",
//   },
//   {
//     id: 2,
//     title: "Software Engineer",
//     company: "Google",
//     status: "Applied",
//     skills: "JavaScript, Python",
//     contacts: "John Doe",
//   },
//   {
//     id: 3,
//     title: "Data Scientist",
//     company: "Facebook",
//     status: "Phone Screen",
//     skills: "Python, SQL",
//     contacts: "Jane Smith",
//   },
//   {
//     id: 4,
//     title: "Product Manager",
//     company: "Amazon",
//     status: "Offer",
//     skills: "Product Management",
//     contacts: "Mark Johnson",
//   },
// ];

export default function Applications() {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [apps, setApps] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) =>
      prev.includes(id)
        ? prev.filter((accordionId) => accordionId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("/api/jobs", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(
            `Error fetching applications: ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log(data);
        setApps(data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    fetchApplications();
  }, []);

  // Open the add modal
  const openModal = () => {
    setIsAddModalOpen(true);
  };

  // Close the add modal
  const closeModal = () => {
    setIsAddModalOpen(false);
  };

  const addApplication = async (application: Application) => {
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
      });

      if (!response.ok) {
        throw new Error(`Error adding application: ${response.statusText}`);
      }

      const newApplication = await response.json();

      // Update the apps state with the new application from the backend
      setApps((prev) => [...prev, newApplication]);
    } catch (error) {
      console.error("Failed to add application:", error);
      // Optionally, display an error message to the user
    }
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
    setApps((prev) =>
      prev.map((app) => (app._id === application._id ? application : app))
    );
    closeEditModal();
  };

  // Delete an existing application
  const deleteApplication = async (id: string) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete application with id ${id}: ${response.statusText}`
        );
      }

      // Update the state only if the deletion was successful
      setApps((prev) => prev.filter((app) => app._id !== id));
      closeEditModal();
    } catch (error) {
      console.error("Error deleting application:", error);
      // Optionally, display an error message to the user
    }
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
          key={application._id}
          className="w-full bg-white rounded-lg shadow-md p-4 cursor-pointer mb-5"
          onClick={() => toggleAccordion(application._id)}
        >
          {/* Display the application title and company */}
          <div className="flex justify-between items-center">
            <h2 className="text-customdarkgrey text-xl font-bold">
              {application.jobType} @ {application.companyName}
            </h2>
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
              {openAccordions.includes(application._id) ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>
          </div>

          {/* Display the application details */}
          {openAccordions.includes(application._id) && (
            <div className="text-left text-customdarkgrey mt-4">
              <p className="text-lg mb-2">
                <strong>Status:</strong> {application.applicationStatus}
              </p>
              <p className="text-lg mb-2">
                <strong>Skills:</strong>{" "}
                {application.skills?.map((skill) => skill.name).join(", ")}
              </p>
              <p className="text-lg">
                <strong>Relevant Contacts:</strong>{" "}
                {application.contacts
                  ?.map((contact) => `${contact.firstName} ${contact.lastName}`)
                  .join(", ")}
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Add the AddApplicationModal and EditApplicationModal components */}
      <AddApplicationModal
        isOpen={isAddModalOpen}
        onClose={closeModal}
        addApplication={addApplication}
      />
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
