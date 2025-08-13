import React, { useState, useRef, useEffect } from "react";


export default function StateSelect({ selected, setSelected , STATES}) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (state) => {
    setSelected(state);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block mb-1 font-medium">State</label>
      <button
        type="button"
        className="w-full border border-gray-300 bg-white rounded-md px-4 py-2 text-left shadow-sm flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="flex items-center gap-2">
          {selected ? (
              <span>{selected.name}</span>
          ) : (
            <span className="text-gray-400">Pick your state</span>
          )}
        </span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {STATES.map((state) => (
            <li
              key={state.id}
              onClick={() => handleSelect(state)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            >
              <span>{state.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
