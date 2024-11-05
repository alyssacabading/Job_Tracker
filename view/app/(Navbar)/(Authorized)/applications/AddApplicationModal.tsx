import React, { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { PiSuitcaseBold } from "react-icons/pi";
import { Application } from "./page";
import ApplicationForm from "./ApplicationForm";

const AddApplicationModal = ({ isOpen, onClose, addApplication }: { isOpen: boolean; onClose: () => void; addApplication: (application: Application) => void }) => {
  const [applicationData, setApplicationData] = useState<Application>({
    id: Date.now(), // Generate a unique id
    title: "",
    company: "",
    status: "",
    skills: "",
    salary: "",
    contacts: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(applicationData);
      addApplication(applicationData);
      onClose();
  };

  const handleSave = () => {
    const event = new Event("submit", { bubbles: true, cancelable: true });
    const form = document.querySelector("form");
    form?.dispatchEvent(event);
  }

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
      {/* Add the modal content */}
      <div className="bg-white p-6 rounded-lg w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex align-baseline">
            <PiSuitcaseBold className="text-3xl align-baseline mr-2"/>
            <h2 className="text-2xl font-bold">Add Application</h2>
          </div>
          <RiCloseLargeFill onClick={onClose} className="cursor-pointer leading-none text-xl text-customdarkgrey hover:text-black transition ease-in-out"/>
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