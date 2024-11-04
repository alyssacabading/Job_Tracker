import React from "react";

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    message
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* Add the modal content */}
      <div className="bg-white p-6 rounded-lg w-[400px]">
        {/* Add the title */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{message}</h2>
        </div>

        {/* Add the confirmation buttons */}
        <div className="flex justify-between">
          <button 
            onClick={onConfirm} 
            className="w-36 flex justify-center bg-customlightred p-1 rounded-lg text-base font-bold transition ease-in-out text-customred border-2 border-customred p-2 rounded hover:bg-customlightredhover"
          >
            Delete
          </button>
          <button 
            onClick={onClose} 
            className="w-32 bg-white p-1 rounded-lg text-base font-bold transition ease-in-out text-black border-2 border-black p-2 rounded hover:border-customdarkgrey hover:text-customdarkgre"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
};

export default ConfirmationModal;