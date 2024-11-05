import React from "react";
import { Application } from "./page";
import FormFooterButtons from "@/app/components/FormFooterButtons";

interface ApplicationFormProps {
  applicationData: Application;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSave: () => void;
  handleDelete?: () => void; // Optional, only present in EditApplicationModal
  onClose: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  applicationData,
  handleChange,
  handleSubmit,
  handleSave,
  handleDelete,
  onClose
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Add the title form field */}
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

      {/* Add the company form field */}
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

      {/* Add the application status form field */}
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

      {/* Add the skills form field */}
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

      {/* Add the salary form field */}
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

      {/* Add the contacts form field */}
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
      
      {/* Add the cancel and add form buttons */}
      <FormFooterButtons
        onDelete={handleDelete}
        onClose={onClose}
        onSave={handleSave}
      />
    </form>
  );
};

export default ApplicationForm;