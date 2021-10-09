import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ENDPOINT, SOKETENDPOINT } from "../constants/global";
import { getAccessTokenAsync, getDeviceIdAsync } from "../storage/authdata";

const DataContext = React.createContext(null);

export default function DataContextProvider({ children, isLoggedIn }) {
  const [ws, setWs] = useState(new WebSocket(SOKETENDPOINT));
  const [messageQueue, setMessageQueue] = useState([]);
  const [onMessage, setOnMessage] = useState(null);

  const init = () => {
    ws.addEventListener("close", handleClose);
    ws.addEventListener("error", handleError);
    ws.addEventListener("message", handleOnMessage);
  };
  useEffect(() => {
    init();
  }, []);

  const handleClose = () => {
    reconnect();
  };

  const handleError = (event) => {
    // console.error(event);
    console.log("error, reconnecting...");
    reconnect();
  };
  const reconnect = () => {
    setWs(new WebSocket(SOKETENDPOINT));
  };

  const handleOnMessage = ({ data }) => {
    if (onMessage) onMessage(data);
    const jsonData = JSON.parse(data);
    let oldMessagesQueue = [...messageQueue];
    oldMessagesQueue.push(jsonData);
    setMessageQueue(oldMessagesQueue);
    // console.log(oldMessagesQueue);
    console.log("new message ", Math.random());
  };

  const sendMessage = (msg) => {
    ws.send(msg);
  };

  return (
    <DataContext.Provider
      value={{
        messageQueue,
        setMessageQueue,
        sendMessage,
        setOnMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { DataContext };
