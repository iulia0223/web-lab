import { useEffect } from "react";
import { io } from "socket.io-client";

import { useSocketStore } from "../store/socketStore";

export const useSocket = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const { setSocket } = useSocketStore();

  useEffect(() => {
    const socket = io(serverUrl);
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [setSocket, serverUrl]);
};
