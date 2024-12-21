import React, {useState} from 'react';
import { ethers } from "ethers";

const AddButton = (props) => {

  const [data, setdata] = useState({
    address: "",
    Balance: null,
});

// Button handler button for handling a
// request event for metamask
const btnhandler = () => {
    // Asking if metamask is already present or not
    if (window.ethereum) {
        // res[0] for fetching a first wallet
        window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((res) =>
                accountChangeHandler(res[0])
            );
    } else {
        alert("install metamask extension!!");
    }
};

// getbalance function for getting a balance in
// a right format with help of ethers
const getbalance = (address) => {
    // Requesting balance method
    window.ethereum
        .request({
            method: "eth_getBalance",
            params: [address, "latest"],
        })
        .then((balance) => {
            // Setting balance
            setdata({
                Balance:
                    ethers.utils.formatEther(balance),
            });
        });
};

// Function for getting handling all events
const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
        address: account,
    });

    // Setting a balance
    getbalance(account);
};
  const {btnVal} = props;
  return (
    <button onClick={btnhandler} className="flex items-center font-medium text-sm py-2 px-4 text-white bg-gradient-to-t from-green-600 to-green-400 shadow-lg shadow-green-500/60 rounded-full hover:shadow-green-500/40 active:shadow-green-500/20">
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
