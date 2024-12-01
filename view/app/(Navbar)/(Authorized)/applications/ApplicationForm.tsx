// ApplicationForm.tsx

import React from "react";
import { ApplicationFormData } from "@/app/types/job"; // We'll define this interface
import FormFooterButtons from "@/app/components/FormFooterButtons";

export enum ApplicationStatus {
  Rejected = "Rejected",
  Applied = "Applied",
  Interviewing = "Interviewing",
  OfferPending = "Offer Pending",
  Accepted = "Accepted",
}

export enum JobType {
  FullTime = "Full-Time",
  PartTime = "Part-Time",
  Internship = "Internship",
  Contracted = "Contracted",
  Temporary = "Temporary",
  Freelance = "Freelance",
}

interface ApplicationFormProps {
  applicationData: ApplicationFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSave: () => void;
  handleDelete?: () => void; // Optional, only present in EditApplicationModal
  onClose: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  applicationData,
  handleChange,
  handleSelectChange,
  handleSubmit,
  handleSave,
  handleDelete,
  onClose,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Job Title */}
      <div className="flex flex-col mb-2">
        <label htmlFor="JobTitle" className="text-s font-bold mb-2">
          Job Title*
        </label>
        <input
          type="text"
          name="jobTitle"
          value={applicationData.jobTitle}
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
        <select
          name="applicationStatus"
          value={applicationData.applicationStatus || ApplicationStatus.Applied}
          onChange={handleSelectChange}
          className="mb-4 p-2 border rounded w-full"
        >
          {Object.values(ApplicationStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
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

      {/* Job Type */}
      <div className="flex flex-col mb-2">
        <label htmlFor="jobType" className="text-s font-bold mb-2">
          Job Type
        </label>
        <select
          name="jobType"
          value={applicationData.jobType || JobType.FullTime}
          onChange={handleChange}
          className="mb-4 p-2 border rounded w-full"
        >
          {Object.values(JobType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
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
