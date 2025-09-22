import React from "react";

const Modal = ({ isOpen, onClose, children, theme }) => {
  if (!isOpen) return null;

  const isLight = theme === "light";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isLight ? "bg-black bg-opacity-20" : "bg-black bg-opacity-50"
        }`}
        onClick={onClose}
      ></div>

      {/* Modal box */}
      <div
        className={`relative w-full max-w-md p-6 rounded-xl shadow-2xl transition-all duration-300
          ${isLight ? "bg-orange-50 text-gray-900 border border-orange-200" : "bg-gray-900 text-gray-100 border border-gray-700"}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
