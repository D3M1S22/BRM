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

import { FormField } from '@/components/form';
import { useWalletStore } from '@/stores/useWallet';
import { useNFTFormStore } from '@/stores/useFormStore';
import { useRouter } from 'next/navigation';
import React, {useState} from 'react';
import { useWriteContract, useSimulateContract } from 'wagmi';
import {wagmiAbi} from "./abi";
import { type WriteContractData, type WriteContractVariables } from 'wagmi/query';
import { config } from '@/config/wagmiConfig';
import { polygonAmoy } from 'viem/chains';
import { type BaseError,useWaitForTransactionReceipt } from 'wagmi'



export default function MintNFTPage() {
  const {wallet} = useWalletStore((state)=>state);
  const {nft, setNFTName, setNFTCategory, setNFTWidth, setNFTHeight, setNFTValue, setNFTDescription, setNFTPassword} = useNFTFormStore((state)=>state);
  const router = useRouter()
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  if(wallet && !wallet.address)
    router.push("/")
  
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

   
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })


 

  const mintNFT = async () => {

    //const result =  useSimulateContract({
    //  abi: wagmiAbi,
    //  address: '0x4B70cA23e95628331660D191f532A52B770886A7',
    //  functionName: 'balanceOf',
    //  args: [
    //    '0xfdbB8851175315bA8c02237fF6F9090C3508fA04',
    //  ],
    //}
    //console.log("resultttt",result)
    if(nft?.nftName && nft?.nftCategory && nft?.nftDescription)
    writeContract({
      abi: wagmiAbi,
      address: '0x37f35686BE32ef6896dF6C5f2BcFd60562B6F447',
      functionName: 'safeMint',
      args: [
        '0xDC51e1C61f9f0f429040730D952943eE6dD17E69' as `0x${string}`,
        BigInt(10000),
        BigInt(1),
        (nft.nftName.encrypted ? "encrypted" : nft?.nftName.value),
        nft?.nftDescription.encrypted ? "encrypted" : nft?.nftDescription.value,
        nft?.nftImage.encrypted ? "encrypted" : nft?.nftImage.value,
        nft?.nftCategory.value,
      ],
    })
  };

//  async function getNFTOwner() {
//    const rpcUrl = "https://rpc-amoy.polygon.technology";  // Polygon Mainnet RPC URL
//    const contractAddress = "0x37f35686BE32ef6896dF6C5f2BcFd60562B6F447";  // NFT contract address (unchanged)
//    const tokenId = 0;  // Token ID
//
//    // The ownerOf function selector for ERC-721
//    const ownerOfSelector = "0x6352211e";
//
//    // Convert tokenId to a 32-byte hex string
//    const tokenIdHex = tokenId.toString(16).padStart(64, '0');
//
//    // Prepare the data to send in the RPC call (function selector + tokenId)
//    const data = ownerOfSelector + tokenIdHex;
//
//    // Create the RPC request payload
//    const payload = {
//        "jsonrpc": "2.0",
//        "method": "eth_call",
//        "params": [
//            {
//                "to": contractAddress,
//                "data": data
//            },
//            "latest"
//        ],
//        "id": 1
//    };
//
//    // Make the fetch request to the Polygon node
//    try {
//        const response = await fetch(rpcUrl, {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json',
//            },
//            body: JSON.stringify(payload),
//        });
//
//        const result = await response.json();
//
//        if (result.result) {
//            // The result will be the owner's address in hex format
//            console.log("Owner Address:", result.result);
//        } else if (result.error) {
//            console.error("Error:", result.error.message);
//        }
//    } catch (error) {
//        console.error("Failed to fetch:", error);
//    }
//}

// Example usage:
//getNFTOwner();

  

   

  return (
    <div className="min-h-screen flex flex-col bg-black">

      {/* Page content */}
      <div className="flex-wrap pt-20 px-4 overflow-y-auto"> {/* Ensure pt-20 accounts for the height of the header */}
        <div className="w-full max-w-lg p-8 rounded-lg shadow-lg border border-gray-700 mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 space-x-2">
            <img src="/BRM_logo_raw.png" alt="Your Logo" className="w-32 h-30 rounded-full" />
          </div>
          {/* Title */}
          <h2 className="text-center text-2xl font-bold text-white mb-6">Mint NFT</h2>
          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            {/* NFT Name with Lock Inside Input */}
            <FormField label='NFT Name' id='nftName' type='text' placeholder='Enter NFT Name' setter={setNFTName} />
            {/* NFT Image */}
            <FormField label='NFT Image' id='nftImage' type='file' placeholder='Upload NFT Image' setter={setNFTName} />
            {/* Category Dropdown */}
            <FormField label='Category' id='nftCategory' type='dropdown' placeholder='Select a Category' dropdownItems={categories} setter={setNFTCategory} />
            {/* Object Dimensions (Width and Height) */}
            <div className="flex space-x-4">
              <FormField label='Width' id='nftWidth' type='text' placeholder='Enter Width' size='w-1/2' setter={setNFTWidth} />
              <FormField label='Height' id='nftHeight' type='text' placeholder='Enter Height' size='w-1/2' setter={setNFTHeight} />
            </div>
            {/* Value Field */}
            <FormField label='Value' id='nftValue' type='text' placeholder='Enter NFT Value' size='w-2/3' setter={setNFTValue} />
           
          {/* NFT Description */}
            <FormField label='NFT Description' id='nftDescription' type='textarea' placeholder='Enter NFT Description' setter={setNFTDescription} /> 

            {/* Password */}
            <FormField label='Password' id='password' type='password' placeholder='Enter Password' setter={setNFTPassword} /> 
            {/* Mint Button */}
            <div className="flex justify-center">
              <button
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
                onClick={async ()=>{await mintNFT();}}
                disabled={isPending || isConfirming || 
                  (nft?.nftName.value == '' || nft?.nftCategory.value == '' || nft?.nftDescription.value == '')} 
              >
                {isPending ? 'Confirming...' : 'Mint'}
              </button>
            </div>
            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
            {error && (
              <div>Error: {(error as BaseError).shortMessage || error.message}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
