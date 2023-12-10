import React, { useState } from "react";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { NFTStorage, File } from "nft.storage";
import { ToastContainer, toast } from "react-toastify";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
function ProjectsToParticipate() {
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
  const kkk = async () => {
    await write();
    toast.success("Data submitted successfully");
  };

  return (
    <div className="text-black">
      <h1 className="text-3xl font-bold">Ongoing Projects</h1>
      <br />
      <br />
      <div className="grid grid-cols-2 space-x-4">
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img class="rounded-t-lg" src="/1.avif" alt="" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Correlation of Heart-Rate with Running over time
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              This study is to explore the effect of running on average heart
              rate during run and througout the day
              <br />
              <p className="text-white">Payout Amount: 50 HKT</p>
            </p>

            <a
              onClick={write}
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit Data
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img class="rounded-t-lg w-full" src="/2.jpeg" alt="" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Track Early symptoms of Alzhimers
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              This study is to explore the early effects of Alzhimers by playing
              a simple memory based game over a period of time
              <br />
              <p className="text-white">Minimum Investment Amount: 50 HKT</p>
            </p>

            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              (Data not recorded yet!)
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsToParticipate;
