"use client";

import React, { useState } from 'react';

export default function Profile() {
  // Placeholder data for NFTs
  const nfts = [{
    imageUrl: 'https://www.bogliettigioielliere.com/wp-content/uploads/2024/07/m126500ln-0001_drp-upright-bba-with-shadow.webp',
    name: 'Rolex Daytona',
    category: 'Luxury', // Placeholder for price
    size: '120 x 40 cm', // Placeholder for price
    price: '7.2 ETH', // Placeholder for price
    tokenId: '12345', // Placeholder for token ID
    owner: '0x123...abc', // Placeholder for owner's address
    debt: 70, // Placeholder for debt (0 means no debt, completely to the left)
  }, {
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Orange_Enzo_Ferrari_%287191948164%29.jpg',
    name: 'Ferrari Enzo',
    category: 'Luxury', // Placeholder for price
    size: '120 x 40 cm', // Placeholder for price
    price: '1976.0 ETH', // Placeholder for price
    tokenId: '12345', // Placeholder for token ID
    owner: '0x123...abc', // Placeholder for owner's address
    debt: 40,
  },
  {
    imageUrl: `https://cdn.shopify.com/s/files/1/0372/8615/0276/files/BLUE_MOON_JOSEPHINE_1024x1024.jpg?v=1636798137`,
    name: 'KOH-I-NOOR',
    category: 'Luxury', // Placeholder for price
    size: '120 x 40 cm', // Placeholder for price
    price: '8275936.2 ETH', // Placeholder for price
    tokenId: '12345', // Placeholder for token ID
    owner: '0x123...abc', // Placeholder for owner's address
    debt: 10, 
    }]

  const [selectedNft, setSelectedNft] = useState(null); // Track the selected NFT for the modal

  // Function to close the modal
  const closeModal = () => setSelectedNft(null);

  // Debt bar styles (green to red)
  const getDebtBarStyle = () => {
    return {
      background: 'linear-gradient(to right, green, yellow, red)', // Green -> Yellow -> Red gradient
      width: '100%',
      height: '10px',
      borderRadius: '5px',
      position: 'relative',
    };
  };

  // Function to get the position of the circle based on debt (for now it's at 0)
  const getDebtCircleStyle = (debtValue) => {
    return {
      position: 'absolute',
      left: `${debtValue}%`, // For now, default at 0%, later connect this to actual debt value
      top: '-1px', // Position the circle slightly above the bar
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: 'black',
      border: '2px solid white',
    };
  };

  return (
    <div className="h-screen p-4 flex flex-col justify-center content-center">
      <h1 className="flex justify-center text-2xl font-bold mb-4">My NFTs</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {nfts.map((nft, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-sm cursor-pointer"
            onClick={() => setSelectedNft(nft)} // Open the modal with the selected NFT
          >
            <img
              src={nft.imageUrl}
              alt={nft.name}
              className="w-full h-auto"
            />
            <div className="p-2 text-center">
              <h3 className="text-sm font-medium mb-2">{nft.name}</h3>
              <p className="text-xs text-gray-500 text-left">Debt: </p>

              {/* Debt Bar */}
              <div style={getDebtBarStyle(nft.debt)}>
                <div style={getDebtCircleStyle(nft.debt)}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedNft && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-black border border-gray-700 rounded-lg shadow-lg max-w-lg w-full relative p-6 animate-fade-in-scale"
            style={{ animation: "fadeInScale 0.5s ease-in-out" }}
          >
            {/* Modal content */}
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-300" onClick={closeModal}>
              X
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">{selectedNft.name}</h2>
            <img src={selectedNft.imageUrl} alt={selectedNft.name} className="w-full h-auto mb-4 rounded-lg" />
            <p className="text-white"><strong>Category:</strong> {selectedNft.category}</p>
            <p className="text-white"><strong>Price:</strong> {selectedNft.price}</p>
            <p className="text-white"><strong>Token ID:</strong> {selectedNft.tokenId}</p>
            <p className="text-white"><strong>Owner:</strong> {selectedNft.owner}</p>


            {/* Debt Label and Bar in the modal */}
            <p className="mt-4 text-white"><strong>Debt:</strong></p>
            <div style={getDebtBarStyle()}>
              <div style={getDebtCircleStyle(selectedNft.debt)}></div>
            </div>

            {/* Repay Debt Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => console.log('Repay Debt clicked')} // Replace this with your actual function
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Repay Debt
              </button>
            </div>
          </div>

          {/* Click outside the modal to close it */}
          <div className="absolute inset-0" onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
}
