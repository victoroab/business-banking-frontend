import React from "react";

import { ModalProps } from "../../interfaces/Global";

const GeneralModal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="rounded-lg p-6 relative overflow-y-auto">{children}</div>
    </div>
  );
};

export default GeneralModal;
