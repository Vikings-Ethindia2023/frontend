import React, { useState } from "react";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { NFTStorage, File } from "nft.storage";
import { ToastContainer, toast } from "react-toastify";

const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIzMTY2OTQwMDFmMzNFNTRDMUMxYWJEYjkwNjMzNDQxODc3NmMxYzEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMjE0OTMzNzc1MiwibmFtZSI6ImV0aGluZGlhMjAyMyJ9.3WkY8i5g5ICvUFzxTkTa9GjFGgn56IApkfz76pfonDg";

export default function CreateProject() {
  const [formData, setFormData] = useState({});
  const handleChange = (key, val) => {
    setFormData((e) => ({ ...e, [key]: val }));
  };
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const { config } = usePrepareContractWrite({
    address: "0xc1Db25CdC56933C18d5BeAe1A61044c7bb87C63B",
    abi: [
      {
        name: "mint",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [],
        outputs: [],
      },
    ],
    functionName: "mint",
  });
  const uploadData = async () => {
    const image = file;

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    const name = "name";
    const description = "Desc";
    // call client.store, passing in the image & metadata
    const k = await nftstorage.store({
      image,
      name,
      description,
      test: "Hallo",
    });
    console.log(k);
    toast("Wow so easy!");
  };
  return (
    <div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            New Project details
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly to investors and
            subjects. Be as descriptive as possible
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="ProjectName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Project Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    value={formData?.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    type="text"
                    name="ProjectName"
                    id="ProjectName"
                    autoComplete="ProjectName"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="My Awesome Research Project"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  value={formData?.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about the project. Provide all links
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Project payout details
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Add more details about your research project
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="inv-amount"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Minimum Investment Amount (HKT tokens)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="inv-amount"
                  id="inv-amount"
                  value={formData?.invAmount}
                  onChange={(e) => handleChange("invAmount", e.target.value)}
                  autoComplete="inv-amount"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="inv-amount"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Payout Amount (HKT Tokens sent out to users for submitting data)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="inv-amount"
                  id="inv-amount"
                  value={formData?.payoutAmount}
                  onChange={(e) => handleChange("payoutAmount", e.target.value)}
                  autoComplete="inv-amount"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Filter Criteria: Age (Minimum Age to participate)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="inv-amount"
                  id="age-amount"
                  value={formData?.ageCriteria}
                  onChange={(e) => handleChange("ageCriteria", e.target.value)}
                  autoComplete="age-amount"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <label
            htmlFor="country"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            More Filter Criterias coming soon!
          </label>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Data Metric type
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Select whether the data would require Personal identification or
                would be used anonymously
              </p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Personal - Data would be shared along with your personal
                    identification
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Anonymously (Aggregated) - Data would be shared as an
                    aggregate over a metric (such as age, gender, etc)
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={uploadData}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}
