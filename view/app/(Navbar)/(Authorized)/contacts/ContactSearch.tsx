import React from "react";

interface ContactSearchProps {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ContactSearch: React.FC<ContactSearchProps> = ({ searchQuery, handleSearch }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-customdarkgrey text-xl font-bold mb-2">Contacts</h2>
        <input
          type="text"
          placeholder="Search by company"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded-lg bg-custombglightgrey border-custombglightgrey w-full placeholder-italic mb-2"
        />
      </div>
    </div>
  );
};

export default ContactSearch;