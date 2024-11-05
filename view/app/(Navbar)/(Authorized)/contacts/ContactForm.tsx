import React from "react";
import { IContact } from "./page";
import FormFooterButtons from "@/app/components/FormFooterButtons";

interface ContactFormProps {
  contactData: IContact;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSave: () => void;
  handleDelete?: () => void; // Optional, only present in EditContactModal
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  contactData,
  handleChange,
  handleSubmit,
  handleSave,
  handleDelete,
  onClose
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Add the first and last name form field */}
      <div className="flex flex-row mb-2 space-x-4">
        {/* Add the first name form field */}
        <div className="flex flex-col flex-1">
          <label htmlFor="firstName" className="text-s font-bold mb-2">First Name*</label>
          <input
            type="text"
            name="firstName"
            value={contactData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="mb-4 p-2 border rounded w-full placeholder-italic"
          />
        </div>

        {/* Add the last name form field */}
        <div className="flex flex-col flex-1">
          <label htmlFor="lastName" className="text-s font-bold mb-2">Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={contactData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="mb-4 p-2 border rounded w-full placeholder-italic"
          />
        </div>
      </div>

      {/* Add the position form field */}
      <div className="flex flex-col mb-2">
        <label htmlFor="position" className="text-s font-bold mb-2">Position*</label>
        <input
          type="text"
          name="position"
          value={contactData.position}
          onChange={handleChange}
          placeholder="Position"
          className="mb-4 p-2 border rounded w-full placeholder-italic"
        />
      </div>

      {/* Add the company form field */}
      <div className="flex flex-col mb-2">
        <label htmlFor="company" className="text-s font-bold mb-2">Company*</label>
        <input
          type="text"
          name="company"
          value={contactData.company}
          onChange={handleChange}
          placeholder="Company"
          className="mb-4 p-2 border rounded w-full placeholder-italic"
        />
      </div>

      {/* Add the email form field */}
      <div className="flex flex-col mb-2">
        <label htmlFor="email" className="text-s font-bold mb-2">Email*</label>
        <input
          type="email"
          name="email"
          value={contactData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-4 p-2 border rounded w-full placeholder-italic"
        />
      </div>

      {/* Add the phone number form field */}
      <div className="flex flex-col mb-2">
        <label htmlFor="phoneNumber" className="text-s font-bold mb-2">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={contactData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
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

export default ContactForm;