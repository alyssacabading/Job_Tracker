import React, { useState, useEffect } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { PiSuitcaseBold } from "react-icons/pi";
import { Application } from "./page";
import { FaRegTrashAlt } from "react-icons/fa";
import ConfirmationModal from "../../../components/ConfirmationModal";

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
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

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

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2">
            <label htmlFor="title" className="text-s font-bold mb-2">Job Title*</label>
            <input
              type="text"
              name="title"
              value={applicationData.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="mb-4 p-2 border rounded w-full placeholder-italic"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="company" className="text-s font-bold mb-2">Company*</label>
            <input
              type="text"
              name="company"
              value={applicationData.company}
              onChange={handleChange}
              placeholder="Company"
              className="mb-4 p-2 border rounded w-full placeholder-italic"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="status" className="text-s font-bold mb-2">Application Status*</label>
            <input
              type="text"
              name="status"
              value={applicationData.status}
              onChange={handleChange}
              placeholder="Application Status"
              className="mb-4 p-2 border rounded w-full placeholder-italic"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="skills" className="text-s font-bold mb-2">Skills</label>
            <input
              type="text"
              name="skills"
              value={applicationData.skills}
              onChange={handleChange}
              placeholder="Skills"
              className="mb-4 p-2 border rounded w-full placeholder-italic"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="salary" className="text-s font-bold mb-2">Salary</label>
            <input
              type="text"
              name="salary"
              value={applicationData.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="mb-4 p-2 border rounded w-full placeholder-italic"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="contacts" className="text-s font-bold mb-2">Relevant Contacts</label>
            <input
              type="text"
              name="contacts"
              value={applicationData.contacts}
              onChange={handleChange}
              placeholder="Contact names"
              className="mb-4 p-2 border rounded w-full placeholder-italic"
            />
          </div>

          {/* Div that contains the delete and cancel/save buttons */}
          <div className="text-xs flex justify-between items-center space-x-3">
            {/* Delete button */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleDelete}
                className="w-36 flex justify-center bg-customlightred p-1 rounded-lg text-base font-bold transition ease-in-out text-customred border-2 border-customred p-2 rounded hover:bg-customlightredhover"
              >
                <FaRegTrashAlt className="text-lg mr-2 self-center"/>
                Delete Job
              </button>
            </div>

            {/* Cancel and Save buttons */}
            <div className="justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="w-32 bg-white p-1 rounded-lg text-base font-bold transition ease-in-out text-black border-2 border-black p-2 rounded hover:border-customdarkgrey hover:text-customdarkgrey"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-32 bg-customblue text-white text-base font-bold p-2 rounded-lg border-2 border-customblue transition ease-in-out hover:bg-custombluehover hover:border-custombluehover"
              >
                Save
              </button>
            </div>
          </div>
        </form>
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