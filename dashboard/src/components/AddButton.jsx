import React from 'react';

const AddButton = () => {
  return (
    <button className="flex items-center font-medium text-sm py-2 px-4 text-white bg-gradient-to-t from-green-600 to-green-400 shadow-lg shadow-green-500/60 rounded-full hover:shadow-green-500/40 active:shadow-green-500/20">
      <svg
        height="24"
        width="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
          fill="currentColor"
        ></path>
      </svg>
      <span>Add Wager</span>
    </button>
  );
};

export default AddButton;
