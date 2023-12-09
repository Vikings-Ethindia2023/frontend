import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import CreateProject from "./pages/CreateProject";
import { useAccount, useConnect, useEnsName } from "wagmi";

const routes = [
  {
    title: "Add Project",
    link: "/new",
  },
  {
    title: "Mint Hive Token",
    link: "/mint",
  },
  {
    title: "All Projects",
    link: "/mint",
  },
];

const Navbar = () => {
  const { address, isConnected } = useAccount();
  console.log(address, isConnected);
  return (
    <div className="w-full relative">
      <div className="absolute sticky w-full  bg-black">
        <div className=" mx-auto p-4 flex w-full items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.svg" alt="" className="h-8 mr-3" />
            <p className="font-bold text-white">HealthHive</p>
          </div>
          <MetaMaskButton theme={"light"} color="white" />
        </div>
      </div>
      <div className="flex w-full text-white">
        <div className="w-64 min-h-screen bg-black">
          {routes.map(({ title, link }, index) => {
            return (
              <div className="flex items-center justify-start my-2 p-4 text-sm w-full hover:text-white">
                {title}
              </div>
            );
          })}
        </div>
        <div className="w-max p-4">
          <CreateProject />
        </div>
      </div>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
