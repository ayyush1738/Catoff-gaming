import React from "react";

const AddButton = ({btnVal, onClick}) => {

    return (
        <button
            onClick={onClick}
            className="flex items-center font-medium text-sm py-2 px-4 text-white bg-gradient-to-t from-gray-600 to-gray-400 shadow-lg shadow-white-500/60 rounded-full hover:shadow-gray-500/40 active:shadow-gray-500/20"
        >
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
            <span>{btnVal}</span>
        </button>
    );
};

export default AddButton;