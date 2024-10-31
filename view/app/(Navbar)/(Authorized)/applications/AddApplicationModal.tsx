import React, { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { PiSuitcaseBold } from "react-icons/pi";

const AddApplicationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [applicationData, setApplicationData] = useState({
      jobTitle: "",
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
            <PiSuitcaseBold className="text-3xl align-baseline mr-2"/>
            <h2 className="text-2xl font-bold">Add Application</h2>
          </div>
          <RiCloseLargeFill onClick={onClose} className="cursor-pointer leading-none text-xl text-customdarkgrey hover:text-black transition ease-in-out"/>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2">
            <label htmlFor="jobTitle" className="text-s font-bold mb-2">Job Title*</label>
            <input
              type="text"
              name="jobTitle"
              value={applicationData.jobTitle}
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
          
          <div className="text-xs flex justify-end space-x-3">
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplicationModal;