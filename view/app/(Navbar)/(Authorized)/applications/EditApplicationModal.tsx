import React, { useState, useEffect } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { PiSuitcaseBold } from "react-icons/pi";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import {
  Application,
  ApplicationFormData,
  Skill,
  Contact,
} from "@/app/types/job";
import ApplicationForm from "./ApplicationForm";

const EditApplicationModal = ({
  isOpen,
  onClose,
  editApplication,
  deleteApplication,
  application,
}: {
  isOpen: boolean;
  onClose: () => void;
  editApplication: (application: Application) => void;
  deleteApplication: (id: string) => void;
  application: Application;
}) => {
  const [applicationData, setApplicationData] = useState<ApplicationFormData>(
    convertApplicationToFormData(application)
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (application) {
      setApplicationData(convertApplicationToFormData(application));
    }
  }, [application]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Convert applicationData back to Application before editing
    const updatedApplication = convertFormDataToApplication(applicationData);
    editApplication(updatedApplication);
    onClose();
  };

  const handleSave = () => {
    const event = new Event("submit", { bubbles: true, cancelable: true });
    const form = document.querySelector("form");
    form?.dispatchEvent(event);
  };

  const handleDelete = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteApplication(applicationData._id);
    setIsConfirmationModalOpen(false);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-baseline">
            <PiSuitcaseBold className="text-3xl mr-2" />
            <h2 className="text-2xl font-bold">Edit Application</h2>
          </div>
          <RiCloseLargeFill
            onClick={onClose}
            className="cursor-pointer text-xl text-customdarkgrey hover:text-black transition ease-in-out"
          />
        </div>

        <ApplicationForm
          applicationData={applicationData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSave={handleSave}
          handleDelete={handleDelete}
          onClose={onClose}
        />
      </div>

      {/* Add the confirmation modal */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this job?"
      />
    </div>
  );
};

// Function to convert Application to ApplicationFormData
function convertApplicationToFormData(
  application: Application
): ApplicationFormData {
  return {
    _id: application._id || "",
    companyName: application.companyName,
    applicationStatus: application.applicationStatus,
    jobType: application.jobType,
    salary: application.salary,
    contacts: application.contacts
      ? application.contacts
          .map((contact) => `${contact.firstName} ${contact.lastName}`)
          .join(", ")
      : "",
    skills: application.skills
      ? application.skills.map((skill) => skill.name).join(", ")
      : "",
  };
}

// Function to convert ApplicationFormData back to Application
function convertFormDataToApplication(
  formData: ApplicationFormData
): Application {
  // Process skills
  const skillNames = formData.skills
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "");
  const skillsArray: Skill[] = skillNames.map((name) => ({ name }));

  // Process contacts
  const contactNames = formData.contacts
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "");
  const contactsArray: Contact[] = contactNames.map((fullName) => {
    const [firstName, lastName] = fullName.split(" ");
    return {
      firstName: firstName || "Unknown",
      lastName: lastName || "Unknown",
      company: "Unknown",
      position: "Unknown",
      email: "unknown@example.com",
    };
  });

  return {
    _id: formData._id,
    companyName: formData.companyName,
    applicationStatus: formData.applicationStatus,
    jobType: formData.jobType,
    salary: formData.salary,
    contacts: contactsArray,
    skills: skillsArray,
  };
}

export default EditApplicationModal;
