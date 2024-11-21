// AddApplicationModal.tsx

import React, { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { PiSuitcaseBold } from "react-icons/pi";
import ApplicationForm from "./ApplicationForm";
import {
  Application,
  ApplicationFormData,
  Skill,
  Contact,
} from "@/app/types/job";

const AddApplicationModal = ({
  isOpen,
  onClose,
  addApplication,
}: {
  isOpen: boolean;
  onClose: () => void;
  addApplication: (application: Application) => void;
}) => {
  const [applicationData, setApplicationData] = useState<ApplicationFormData>({
    _id: "",
    companyName: "",
    applicationStatus: "",
    jobType: "",
    salary: null,
    contacts: "",
    skills: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({
      ...prev,
      [name]: name === "salary" ? parseFloat(value) || null : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Process skills input
    const skillNames = applicationData.skills
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name !== "");
    const skillsArray: Skill[] = skillNames.map((name) => ({ name }));

    // Process contacts input
    const contactNames = applicationData.contacts
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

    // Create the Application object
    const application: Application = {
      _id: "",
      companyName: applicationData.companyName,
      applicationStatus: applicationData.applicationStatus,
      jobType: applicationData.jobType,
      salary: applicationData.salary,
      skills: skillsArray,
      contacts: contactsArray,
    };

    console.log(application);
    addApplication(application);
    onClose();
  };

  const handleSave = () => {
    const event = new Event("submit", { bubbles: true, cancelable: true });
    const form = document.querySelector("form");
    form?.dispatchEvent(event);
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
      {/* Modal content */}
      <div className="bg-white p-6 rounded-lg w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-baseline">
            <PiSuitcaseBold className="text-3xl mr-2" />
            <h2 className="text-2xl font-bold">Add Application</h2>
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
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default AddApplicationModal;
