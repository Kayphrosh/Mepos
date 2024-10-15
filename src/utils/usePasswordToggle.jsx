import { useState } from "react";

export const usePasswordToggle = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return [isVisible, toggleVisibility];
};
