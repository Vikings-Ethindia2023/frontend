import React, { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { NotificationItem } from "@pushprotocol/uiweb";

function Notifications(props) {
  const [wallet, setWallet] = useState(
    "0xD8634C39BBFd4033c0d3289C4515275102423681"
  );
  const [notifItems, setNotifItems] = useState([]);

  const walletRef = useRef();

  useEffect(() => {
    if (walletRef.current) {
      walletRef.current.value = wallet;
    }
  }, [wallet]);

  const fetchNotification = async () => {
    const walletText = "0x258FB6154078A2E3fffE19fA3982E6BBA5F8915f";
    //

    // Demo only supports MetaMask (or other browser based wallets) and gets provider that injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Switch to sepolia
    await provider.send("wallet_switchEthereumChain", [
      { chainId: "0xAA36A7" },
    ]);

    // Get provider
    await provider.send("eth_requestAccounts", []);

    // Grabbing signer from provider
    const signer = provider.getSigner();

    // Initialize user for push
    const userAlice = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });

    // retrieve notifications for users
    const inboxNotifications = await userAlice.notification.list("INBOX", {
      account: `eip155:11155111:${wallet}`,
      limit: 5,
    });

    // set notifItems state so that react can render
    setNotifItems(inboxNotifications);
  };

  function NotificationInterface() {
    const inputStyle = {
      padding: "10px",
      margin: "10px 0",
      width: "100%",
      boxSizing: "border-box",
    };

    const textareaStyle = {
      ...inputStyle,
      height: "100px",
      resize: "vertical",
    };

    const buttonStyle = {
      padding: "10px 20px",
      backgroundColor: "#dd44b9",
      color: "#FFF",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
    };

    return (
      <div style={{ width: "auto", margin: "20px auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}></div>
        <button style={buttonStyle} onClick={fetchNotification}>
          Fetch Notifications
        </button>

        <p />
        <p />

        {notifItems.length > 0 ? (
          <h3>{`Notification Items for ${wallet}`}</h3>
        ) : (
          <></>
        )}

        {notifItems.map((notifItemSingular, idx) => {
          const {
            cta,
            title,
            message,
            app,
            icon,
            image,
            url,
            blockchain,
            notification,
          } = notifItemSingular;

          return (
            <NotificationItem
              key={idx} // any unique id
              notificationTitle={title}
              notificationBody={message}
              cta={cta}
              app={app}
              icon={icon}
              image={image}
              url={url}
              theme={"light"} // or can be dark
              chainName={blockchain}
              // chainName={blockchain as chainNameType} // if using Typescript
            />
          );
        })}
      </div>
    );
  }

  return (
    <>
      <NotificationInterface />
    </>
  );
}
export default Notifications;
