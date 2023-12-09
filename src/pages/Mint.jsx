import React, { useState } from "react";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { NFTStorage, File } from "nft.storage";
import { ToastContainer, toast } from "react-toastify";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
function Mint() {
  const { config } = usePrepareContractWrite({
    address: "0x761bf9f599b2c2a03faf02e7a3c9259bb5e238a7",
    abi: [
      {
        inputs: [],
        name: "purchaseTokens",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "purchaseTokens",
    value: "100000000",
  });
  const { write } = useContractWrite(config);

  return (
    <div className="text-black">
      <h1>Mint Tokens to invest in research projects</h1>
      <p>Price:0.00000000001 MATIC</p>
      <button
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={write}
      >
        Mint
      </button>
    </div>
  );
}

export default Mint;
