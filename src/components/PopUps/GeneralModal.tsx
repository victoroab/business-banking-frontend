import React from "react";

import { ModalProps } from "../../interfaces/Global";

const GeneralModal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative shadow-lg overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default GeneralModal;
