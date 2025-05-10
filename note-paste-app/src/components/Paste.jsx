import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../redux/pasteSlice";
import { Link } from "react-router-dom";

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(remove(pasteId));
    toast.success("Note deleted");
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <input
        className="w-full px-5 py-3 text-white bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 placeholder-gray-400"
        type="search"
        placeholder="🔍 Search notes by title..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-gray-900 text-white p-6 rounded-3xl shadow-md border border-gray-700 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <h2 className="text-xl font-semibold mb-2 truncate">{paste.title}</h2>

              <p className="text-sm text-gray-300 line-clamp-5 mb-4">{paste.content}</p>

              <p className="text-xs text-gray-500 mb-4 italic">
                Created: {formatDate(paste.createdAt)}
              </p>

              <div className="flex flex-wrap gap-2 justify-start mt-auto">
                <a
                  href={`/?pasteId=${paste._id}`}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-medium transition duration-200"
                >
                  Edit
                </a>

                <Link
                  to={`/pastes/${paste._id}`}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl text-sm font-medium transition duration-200"
                >
                  View
                </Link>

                <button
                  onClick={() => handleDelete(paste._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-sm font-medium transition duration-200"
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl text-sm font-medium transition duration-200"
                >
                  Copy
                </button>

                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/pastes/${paste._id}`;
                    navigator.clipboard.writeText(shareUrl);
                    toast.success("Link copied to clipboard!");
                  }}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-sm font-medium transition duration-200"
                >
                  Share
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-lg font-medium mt-10">
            No notes found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Paste;
