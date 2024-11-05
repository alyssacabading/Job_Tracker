import React, { useState, useEffect } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { PiSuitcaseBold } from "react-icons/pi";
import { Application } from "./page";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import ApplicationForm from "./ApplicationForm";

const EditApplicationModal = ({
  isOpen,
  onClose,
  editApplication,
  deleteApplication,
  application
}: {
  isOpen: boolean;
  onClose: () => void;
  editApplication: (application: Application) => void;
  deleteApplication: (id: number) => void;
  application: Application
}) => {
  const [applicationData, setApplicationData] = useState<Application>(application);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (application) {
      setApplicationData(application);
    }
  }, [application]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Editing application: ", applicationData);
      editApplication(applicationData);
      onClose();
  };

  const handleSave = () => {
    const event = new Event("submit", { bubbles: true, cancelable: true });
    const form = document.querySelector("form");
    form?.dispatchEvent(event);
  }

  const handleDelete = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteApplication(applicationData.id);
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
          <div className="flex align-baseline">
            <PiSuitcaseBold className="text-3xl align-baseline mr-2 self-center"/>
            <h2 className="text-2xl font-bold">Edit Application</h2>
          </div>
          <RiCloseLargeFill onClick={onClose} className="cursor-pointer leading-none text-xl text-customdarkgrey hover:text-black transition ease-in-out"/>
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

export default EditApplicationModal;