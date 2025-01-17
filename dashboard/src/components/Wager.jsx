// Import necessary libraries
import React, { useState } from 'react';
import axios from 'axios';

const CreateWager = () => {
  // State variables for form inputs and generated wager link
  const [betAmount, setBetAmount] = useState('');
  const [chain, setChain] = useState('USD');
  const [wagerType, setWagerType] = useState('First to kill 6 people');
  const [wagerLink, setWagerLink] = useState('');

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send wager data to the backend
      const response = await axios.post('http://localhost:8000/api/setWager/create', {
        betAmount,
        chain,
        wagerType,
      });

      // Update wager link state with the response from backend
      setWagerLink(response.data.wagerLink);
    } catch (error) {
      console.error('Error creating wager:', error);
      alert('Failed to create wager. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Create a Wager</h2>

      <form onSubmit={handleSubmit}>
        {/* Bet Amount Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Bet Amount</label>
          <input
            type="number"
            className="w-full border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            placeholder="Enter bet amount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            required
          />
        </div>

        {/* Chain Selector */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Select Chain</label>
          <select
            className="w-full border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            value={chain}
            onChange={(e) => setChain(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="ETH">ETH (Holesky)</option>
          </select>
        </div>

        {/* Wager Type Selector */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Wager Type</label>
          <select
            className="w-full border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            value={wagerType}
            onChange={(e) => setWagerType(e.target.value)}
          >
            <option value="First to kill 6 people">First to kill 6 people</option>
            <option value="First to kill 10 people">First to kill 10 people</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Create Wager
        </button>
      </form>

      {/* Display Generated Wager Link */}
      {wagerLink && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700 font-medium">Wager Link:</p>
          <a
            href={wagerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {wagerLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default CreateWager;
