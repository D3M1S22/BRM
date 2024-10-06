//"use client";
//import abi_ from "./abi.json";
//
//
//const contractAddress = "0xEF93aD993397cE23Bd1E720B5d9310F0bE2F2451";
//const ownerAddress = "0xbCeDfD31a13CC5180De3E84C65aed6cd66458817";
//
//
//
//import {
//  type UseSendUserOperationResult,
//  useSendUserOperation,
//  useSmartAccountClient,
//} from "@account-kit/react";
//
//
//import { encodeFunctionData } from 'viem'
//
//import { publicClient } from '../../utils/clients'
//import { useCallback, useEffect, useState } from "react";
//
//
//
//
//export default function Dashboard() {
//  const [hash, setHash] = useState<string | null>(null);
//  const { client } = useSmartAccountClient({ type: "LightAccount", policyId: "8a5168c9-9f4e-408d-975a-5ebe475721ce"});
//
//
//
// const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
//    client,
//    // optional parameter that will wait for the transaction to be mined before returning
//    waitForTxn: true,
//
//    onSuccess: async({ hash, request }) => {
//      // [optional] Do something with the hash and request
//      setHash(hash);
//      const resp = await client?.getTransactionReceipt({hash:hash as `0x${string}`})
//      console.log(resp)
//    },
//    onError: (error) => {
//      // [optional] Do something with the error
//      console.error("Error occurred:", error.message);
//    },
//  });
//
//  useEffect(() => {
//
//    (async () => {
//      if (hash) {
//        console.log('hash', hash);
//        const transaction = await client?.getTransactionReceipt({hash:hash as `0x${string}`}) 
//        console.log(transaction);
//      }
//    })()
//  }, [hash])
//
//  const data_ = encodeFunctionData({
//    abi: abi_.abi,
//    functionName: 'tokensOfOwner',
//    args: ['0xbCeDfD31a13CC5180De3E84C65aed6cd66458817' ],
//  })
//
//  const getOwnData = useCallback(async () => {
//    const resp_ = await sendUserOperation({
//      uo: {
//        target: "0xD6a59d214AcEEFEa7c972fC90F91BAEf70249aA5",
//        data: data_,
//        value: 0n,
//      },
//    });
//    console.log("aaaaa ",resp_); 
//  }, []);
//
//
//  return (
//    <>
//      <div className='flex justify-center items-center h-screen '>
//        <button
//        onClick={async()=>getOwnData()}
//        disabled={isSendingUserOperation}
//      >
//        {isSendingUserOperation ? "Sending..." : "Send UO"}
//      </button>      </div>
//    </>
//  );
//
//}

"use client";

import React, { useState } from 'react';
import { FaLock, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function MintNFTPage() {
  const [isEncrypted, setIsEncrypted] = useState(false); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Select a Category');
  const [width, setWidth] = useState(''); 
  const [height, setHeight] = useState(''); 
  const [nft_value, setValue] = useState(''); 
  const [destination_address, setAddress] = useState(''); 
  const [isTooltipVisible, setIsTooltipVisible] = useState(false); // Track tooltip visibility

  const categories = [
    'Art & Collectibles',
    'Real Estate',
    'Vehicles',
    'Jewelry & Accessories',
    'Electronics & Gadgets',
    'Furniture & Home Decor',
    'Fashion & Apparel',
    'Musical Instruments',
    'Sports Equipment',
    'Books & Literature',
    'Memorabilia & Historical Items',
    'Toys & Games',
    'Luxury Goods',
    'Weapons & Militaria',
    'Industrial Equipment',
  ];

  const toggleEncryption = () => {
    setIsEncrypted(!isEncrypted); // Toggle the lock state
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the category dropdown
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category); // Set selected category
    setIsDropdownOpen(false); // Close the dropdown after selecting
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">

      {/* Page content */}
      <div className="flex-1 pt-20 px-4 overflow-y-auto"> {/* Ensure pt-20 accounts for the height of the header */}
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-700 mx-auto">

          {/* Logo */}
          <div className="flex items-center justify-center h-16 space-x-2">
            <img src="/BRM_logo_raw.png" alt="Your Logo" className="w-32 h-30 rounded-full" />
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-bold text-white mb-6">Mint NFT</h2>

          {/* Form */}
          <form>
            {/* NFT Name with Lock Inside Input */}
            <div className="mb-4 relative">
              <label className="block text-white text-sm font-medium mb-1" htmlFor="nftName">NFT Name</label>
              <div className="relative">
                <input
                  type="text"
                  id="nftName"
                  placeholder="Enter NFT Name"
                  className="w-full px-4 py-2 text-black bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 pr-10"
                />

                {/* Lock Icon Inside the Input */}
                <FaLock
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer transition-colors duration-300 ${
                    isEncrypted ? 'text-blue-500' : 'text-gray-400'
                  }`}
                  onClick={toggleEncryption}
                  onMouseEnter={() => setIsTooltipVisible(true)} // Show tooltip on hover
                  onMouseLeave={() => setIsTooltipVisible(false)} // Hide tooltip on mouse leave
                />

                {/* Tooltip */}
                {isTooltipVisible && (
                 <div className="absolute right-12 top-[-30px] p-2 bg-gray-700 text-white text-xs rounded-lg shadow-lg">
                    This icon indicates whether the NFT is encrypted.
                  </div>
                )}
              </div>

              {/* Encryption Message */}
              <p className="text-xs mt-2 text-gray-400">
                {isEncrypted ? 'Encrypted NFT' : 'Unencrypted NFT'}
              </p>
            </div>

            {/* Category Dropdown */}
            <div className="mb-4 relative">
              <label className="block text-white text-sm font-medium mb-1" htmlFor="nftCategory">Category</label>
              <div
                className="w-full px-4 py-2 bg-gray-100 text-black rounded-lg border border-gray-300 cursor-pointer flex items-center justify-between"
                onClick={toggleDropdown}
              >
                <span>{selectedCategory}</span>
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {isDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-gray-100 rounded-lg shadow-lg border border-gray-300 max-h-60 overflow-y-auto">
                  <ul className="text-black">
                    {categories.map((category) => (
                      <li
                        key={category}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Object Dimensions (Width and Height) */}
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-1">Dimensions</label>
              <div className="flex space-x-4">

                {/* Width Input */}
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-4 py-2 text-black bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Height Input */}
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-2 text-black bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Value Field */}
            <div className="mb-4 w-1/4">
              <label className="block text-white text-sm font-medium mb-1" htmlFor="nftValue">Value</label>
              <input
                type="text"
                placeholder="Value"
                value={nft_value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-2 text-black bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address Field */}
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-1" htmlFor="nftValue">Destination Address</label>
              <input
                type="text"
                placeholder="Destination Address"
                value={destination_address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 text-black bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* NFT Description */}
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-1" htmlFor="nftDescription">NFT Description</label>
              <textarea
                id="nftDescription"
                placeholder="Description for the NFT"
                className="w-full px-4 py-2 text-black bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-1" htmlFor="nftPassword">NFT Password</label>
              <input
                type="password"
                id="nftPassword"
                placeholder="Password to reveal confidential message"
                className="w-full px-4 py-2 text-black bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mint Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Mint NFT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
