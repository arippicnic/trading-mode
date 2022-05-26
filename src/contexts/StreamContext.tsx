import { createContext, useState, useMemo, useRef, useEffect, useContext } from "react";
import { CryptoPrice } from "@types";

type ContextProps = {
  isStrem: CryptoPrice;
};
const StremContext = createContext<Partial<ContextProps>>({});

export const useStremContext = () => useContext(StremContext);
export default StremContext;

export function StremContextProvider({ children, url }: { children: React.ReactNode; url: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const webSocket = useRef<null | WebSocket>(null);
  const [waitingToReconnect, setWaitingToReconnect] = useState(false);
  const [isStrem, setStrem] = useState<CryptoPrice | {}>({});
  const value = useMemo(() => ({ isStrem, setStrem }), [isStrem]);

  useEffect(() => {
    if (waitingToReconnect) {
      return;
    }
    if (!webSocket.current) {
      const client = new WebSocket(url);
      webSocket.current = client;
      webSocket.current = client;
      client.onerror = (e) => console.error(e);
      client.onopen = () => {
        setIsOpen(true);
        client.send("ping");
      };

      client.onclose = () => {
        if (webSocket.current) {
          console.log("ws closed by server");
        } else {
          console.log("ws closed by app component unmount");
          return;
        }
        if (waitingToReconnect) {
          return;
        }
        setIsOpen(false);
        setWaitingToReconnect(true);
        setTimeout(() => setWaitingToReconnect(false), 5000);
      };

      client.onmessage = (message) => {
        const msgJSON = JSON.parse(message.data);
        setStrem(msgJSON);
      };

      return () => {
        webSocket.current = null;
        client.close();
      };
    }
  }, [url, waitingToReconnect]);
  return <StremContext.Provider value={value}>{children}</StremContext.Provider>;
}
