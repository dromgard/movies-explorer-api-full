import React, { useEffect, useState } from 'react';

const getWidth = () => {
  return document.documentElement.clientWidth;
};

function useCurrentSize() {
  const [size, setSize] = useState({
    width: getWidth(),
  });

  useEffect(() => {

    let timeOutId = null;

    const handleResize = () => { //debounce function
      clearTimeout(timeOutId);

      timeOutId = setTimeout(() => {
        setSize({
          width: getWidth(),
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return size;
}

export default useCurrentSize;
