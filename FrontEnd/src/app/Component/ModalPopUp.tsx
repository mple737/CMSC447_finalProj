import React from "react";

interface ModalProps {
  open: boolean;
  title: string;
  message: string;
  type: "success" | "error";
  onClose: () => void;
  onConfirm?: () => void; 
}

const ModalPopup: React.FC<ModalProps> = ({ open, title, message, type, onClose, onConfirm }) => {
  if (!open) return null; // If the modal doesnt not open, then we don't render it

  const modalStyles = type === "success" ? "bg-gray-300" : "bg-gray-300";

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      
      <div className={`p-6 rounded-lg w-80 bg-white ${modalStyles}`}>
        
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        
        <p className="mt-2 text-gray-800 font-bold">{message}</p>
        
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>

          {onConfirm && (
            
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
