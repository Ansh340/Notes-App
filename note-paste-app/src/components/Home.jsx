import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { add, update } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function createNotes() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(update(paste));
    } else {
      dispatch(add(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  return (
    <div className="w-full flex justify-center px-4 py-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="w-full max-w-6xl">
        {/* Title and Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            className="w-full md:flex-1 p-4 rounded-xl bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="text"
            placeholder="Enter Title Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={createNotes}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition w-full md:w-auto"
          >
            {pasteId ? "Update Notes" : "Create Notes"}
          </button>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full rounded-xl bg-white dark:bg-black text-black dark:text-white p-4 min-h-[300px] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          value={value}
          placeholder="Enter Content Here"
          onChange={(e) => setValue(e.target.value)}
        />

        {/* Date Info */}
        {pasteId && (
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>Last updated on: {formatDate(new Date())}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
