import React, { useState, useEffect } from "react";
import "./game.css";
import {
  createLightNode,
  waitForRemotePeer,
  createEncoder,
  createDecoder,
} from "@waku/sdk";
import { useSignMessage } from "wagmi";
import { ToastContainer, toast } from "react-toastify";

import protobuf from "protobufjs";

const SYMBOLS = ["@", "#", "$", "%"];

const Game = () => {
  const {
    data: signMessageData,
    error,
    isLoading,
    signMessage,
    variables,
  } = useSignMessage();

  const [board, setBoard] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeOpenedItems, setActiveOpeningItems] = useState([]);
  const [clicks, setClicks] = useState(0);
  const contentTopic =
    "/healthlive/1/0x258FB6154078A2E3fffE19fA3982E6BBA5F8915f";
  const signAndPublish = async () => {
    const node = await createLightNode({ defaultBootstrap: true });
    await node.start();
    await waitForRemotePeer(node);
    const encoder = createEncoder({ contentTopic });
    const decoder = createDecoder(contentTopic);
    const DataPoint = new protobuf.Type("DataPoint")
      .add(new protobuf.Field("timestamp", 1, "uint64"))
      .add(new protobuf.Field("sender", 2, "string"))
      .add(new protobuf.Field("steps", 3, "string"));
    const protoMessage = DataPoint.create({
      timestamp: Date.now(),
      sender: "0x258FB6154078A2E3fffE19fA3982E6BBA5F8915f",
      steps: clicks,
    });
    await signMessage({ message: JSON.stringify(protoMessage.toJSON()) });
    const protoMessage2 = DataPoint.create({
      timestamp: Date.now(),
      sender: "0x258FB6154078A2E3fffE19fA3982E6BBA5F8915f",
      steps: signMessageData,
    });
    const serialisedMessage = DataPoint.encode(protoMessage2).finish();
    // toast.success("Data captured and pushed")

    // Send the message using Light Push
    await node.lightPush.send(encoder, {
      payload: serialisedMessage,
    });
    toast.success("Data captured and pushed");
  };

  const getNewBoard = () => {
    const l = [...SYMBOLS, ...SYMBOLS];
    l.sort(function (a, b) {
      return 0.5 - Math.random();
    });
    for (let i = 0; i < l.length; i++) {
      setBoard((board) => {
        board[i] = {
          id: i,
          value: l[i],
          isOpened: false,
          isMatched: false,
        };
        return [...board];
      });
    }
  };
  const onBtnClick = () => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    getNewBoard();
    setActiveOpeningItems([]);
    setClicks(0);
  };
  const onBoardItemClick = (id) => {
    setActiveOpeningItems((openedItems) => [...openedItems, id]);
    setBoard((b) =>
      b.map((_i) => {
        if (_i.id === id) {
          return {
            ..._i,
            isOpened: true,
          };
        }
        return _i;
      })
    );
  };
  useEffect(() => {
    if (activeOpenedItems.length === 2) {
      const fn = () => {
        const item1 = board.find(({ id }) => id === activeOpenedItems[0]);
        const item2 = board.find(({ id }) => id === activeOpenedItems[1]);
        const isMatch = item1.value === item2.value;
        if (isMatch) {
          setBoard((board) =>
            board.map((item) => {
              if (item.id === item1.id || item.id === item2.id) {
                return {
                  ...item,
                  isMatched: true,
                };
              }
              return item;
            })
          );
        } else {
          setBoard((board) =>
            board.map((item) => {
              if (item.id === item1.id || item.id === item2.id) {
                return {
                  ...item,
                  isOpened: false,
                };
              }
              return item;
            })
          );
        }
        setActiveOpeningItems([]);
      };
      setTimeout(fn, 1500);
    }
  }, [activeOpenedItems, board]);
  const isDisabled = activeOpenedItems.length === 2;
  const finished =
    board.length > 0 &&
    board.filter((b) => b.isMatched).length === board.length;
  return (
    <div className="game-container text-black">
      <div className="game-container-btn">
        <button onClick={onBtnClick} className="">
          {gameStarted ? "Reset" : "New"}
        </button>
      </div>
      {board.length > 0 && (
        <div className="game-board">
          {board.map((b, i) => (
            <GameBoardItem
              key={`${b.id}_${b.value}`}
              {...b}
              onBoardClick={() => {
                onBoardItemClick(b.id);
                setClicks((c) => c + 1);
              }}
              disabled={isDisabled}
            />
          ))}
        </div>
      )}
      <div className="game-board-score">
        {finished ? `Finished in ${clicks} steps` : `${clicks} steps`}
      </div>
      {finished && (
        <div className="game-container-btn">
          <button onClick={signAndPublish}>Submit</button>
        </div>
      )}
    </div>
  );
};

const GameBoardItem = ({
  isOpened,
  value,
  onBoardClick,
  disabled,
  isMatched,
}) => {
  if (isOpened) {
    const classList = ["game-board-item", "opened"];
    isMatched && classList.push("item-matched");
    return <div className={classList.join(" ")}>{value}</div>;
  }
  return (
    <div
      className="game-board-item"
      onClick={() => (!disabled ? onBoardClick() : () => {})}
    ></div>
  );
};

export default Game;
