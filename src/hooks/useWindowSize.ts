import { useState, useEffect } from 'react';

interface WindowSizes {
  width: undefined | number;
  height: undefined | number;
}

export const useWindowSize = () => {
  const initialSizesObject: WindowSizes = {
    width: undefined,
    height: undefined,
  };

  const [windowSize, setWindowSize] = useState(initialSizesObject);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  },
    [],
  );

  return windowSize;
};
