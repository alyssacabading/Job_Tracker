import { FaRegTrashAlt } from "react-icons/fa";

interface FormFooterButtonsProps {
  onDelete?: () => void; // Optional, only present in edit modals
  onClose: () => void;
  onSave: () => void;
}

const FormFooterButtons = ({ onDelete, onClose, onSave }: FormFooterButtonsProps) => {
  return (
    <div className="text-xs flex justify-between items-center space-x-3">
      {/* Delete button if it is an edit modal */}
      <div className="flex items-center">
        {onDelete && (
          <button 
            type="button" 
            onClick={onDelete} 
            className="w-36 flex justify-center bg-customlightred p-1 rounded-lg text-base font-bold transition ease-in-out text-customred border-2 border-customred p-2 rounded hover:bg-customlightredhover"
          >
            <FaRegTrashAlt className="text-lg mr-2 self-center" />
            Delete
          </button>
        )}
      </div>

      {/* Cancel and save buttons */}
      <div className="justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="w-32 bg-white p-1 rounded-lg text-base font-bold transition ease-in-out text-black border-2 border-black p-2 rounded hover:border-customdarkgrey hover:text-customdarkgrey"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="w-32 bg-customblue text-white text-base font-bold p-2 rounded-lg border-2 border-customblue transition ease-in-out hover:bg-custombluehover hover:border-custombluehover"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FormFooterButtons;