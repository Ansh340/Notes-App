import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const reduxPastes = useSelector((state) => state.paste?.pastes || []);
  const [paste, setPaste] = useState(null);

  useEffect(() => {
    // Fallback to localStorage if Redux is empty
    const localPastes = JSON.parse(localStorage.getItem("pastes") || "[]");

    const allPastes = reduxPastes.length > 0 ? reduxPastes : localPastes;

    const foundPaste = allPastes.find(
      (p) => p._id === id || p.id === id // support both _id and id
    );

    if (!foundPaste) {
      console.warn("Paste not found for ID:", id);
    }

    setPaste(foundPaste);
  }, [id, reduxPastes]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {paste ? (
        <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-700">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center border-b pb-3 border-gray-700">
            View Note
          </h1>

          <div className="mb-6">
            <label className="block text-sm sm:text-base font-medium text-gray-400 mb-2">
              Title
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none cursor-not-allowed text-sm sm:text-base"
              type="text"
              value={paste.title}
              disabled
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-400 mb-2">
              Content
            </label>
            <textarea
              className="w-full px-4 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white resize-none h-[250px] sm:h-[300px] md:h-[350px] focus:outline-none cursor-not-allowed text-sm sm:text-base overflow-auto"
              value={paste.content}
              disabled
            />
          </div>
        </div>
      ) : (
        <div className="text-center text-red-400 font-semibold text-lg sm:text-xl">
          Paste not found.
        </div>
      )}
    </div>
  );
};

export default ViewPaste;
