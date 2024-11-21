// ApplicationForm.tsx

import React from "react";
import { ApplicationFormData } from "@/app/types/job"; // We'll define this interface
import FormFooterButtons from "@/app/components/FormFooterButtons";

interface ApplicationFormProps {
  applicationData: ApplicationFormData;
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
  onClose,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Job Title */}
      <div className="flex flex-col mb-2">
        <label htmlFor="jobType" className="text-s font-bold mb-2">
          Job Title*
        </label>
        <input
          type="text"
          name="jobType"
          value={applicationData.jobType}
          onChange={handleChange}
          placeholder="Job Title"
          className="mb-4 p-2 border rounded w-full placeholder-italic"
        />
      </div>

      {/* Company */}
      <div className="flex flex-col mb-2">
        <label htmlFor="companyName" className="text-s font-bold mb-2">
          Company*
        </label>
        <input
          type="text"
          name="companyName"
          value={applicationData.companyName}
          onChange={handleChange}
          placeholder="Company"
          className="mb-4 p-2 border rounded w-full placeholder-italic"
        />
      </div>

      {/* Application Status */}
      <div className="flex flex-col mb-2">
        <label htmlFor="applicationStatus" className="text-s font-bold mb-2">
          Application Status*
        </label>
        <input
          type="text"
          name="applicationStatus"
          value={applicationData.applicationStatus}
          onChange={handleChange}
          placeholder="Application Status"
          className="mb-4 p-2 border rounded w-full placeholder-italic"
        />
      </div>

      {/* Skills */}
      <div className="flex flex-col mb-2">
        <label htmlFor="skills" className="text-s font-bold mb-2">
          Skills
        </label>
        <input
          type="text"
          name="skills"
          value={applicationData.skills}
          onChange={handleChange}
          placeholder="Skills (comma-separated)"
          className="mb-4 p-2 border rounded w-full placeholder-italic"
        />
      </div>

      {/* Salary */}
      <div className="flex flex-col mb-2">
        <label htmlFor="salary" className="text-s font-bold mb-2">
          Salary
        </label>
        <input
          type="text"
          name="salary"
          value={applicationData.salary || ""}
          onChange={handleChange}
          placeholder="Salary"
          className="mb-4 p-2 border rounded w-full placeholder-italic"
        />
      </div>

      {/* Contacts */}
      <div className="flex flex-col mb-2">
        <label htmlFor="contacts" className="text-s font-bold mb-2">
          Relevant Contacts
        </label>
        <input
          type="text"
          name="contacts"
          value={applicationData.contacts}
          onChange={handleChange}
          placeholder="Contact names (comma-separated)"
          className="mb-4 p-2 border rounded w-full placeholder-italic"
        />
      </div>

      {/* Form Footer Buttons */}
      <FormFooterButtons
        onDelete={handleDelete}
        onClose={onClose}
        onSave={handleSave}
      />
    </form>
  );
};

export default ApplicationForm;
