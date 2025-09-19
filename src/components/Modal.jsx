import React from "react";

const Modal = ({ isOpen, onClose, children, theme }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal box */}
      <div
        className={`relative w-full max-w-md p-6 rounded-xl shadow-lg transition ${
          theme === "light"
            ? "bg-white text-gray-900"
            : "bg-gray-900 text-gray-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
