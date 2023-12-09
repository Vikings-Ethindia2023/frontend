import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
const root = ReactDOM.createRoot(document.getElementById("root"));

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);
const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

root.render(
  <>
    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          name: "React Demo Button",
          url: "http://reactdemobutton.localhost",
        },

        checkInstallationImmediately: true,
      }}
    >
      <WagmiConfig config={config}>
        <ToastContainer />
        <App />
      </WagmiConfig>
    </MetaMaskUIProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
