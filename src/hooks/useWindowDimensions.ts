import { useState, useEffect } from "react";

interface PropType {
  width: number | undefined;
  height: number | undefined;
}

export default function useWindowDimensions() {
  const [windowSize, setWindowSize] = useState<PropType>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}
