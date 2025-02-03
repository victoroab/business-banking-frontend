import React from "react";
import { CloseIcon } from "../../assets/svg/Auth";
import { ModalProps } from "../../interfaces/Global";

const GeneralModal: React.FC<ModalProps> = ({ handleModalClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white border-2 rounded-lg p-6 max-w-lg w-full relative shadow-lg overflow-y-auto">
        <button
          onClick={handleModalClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default GeneralModal;
