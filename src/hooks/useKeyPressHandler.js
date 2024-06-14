import { useEffect } from "react";

const useKeyPressHandler = (handleKeyPress, gameActive) => {
  useEffect(() => {
    if (!gameActive) return;

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, gameActive]);
};

export default useKeyPressHandler;
