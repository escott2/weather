import React, { useEffect, useRef } from 'react';

function useDidMountEffect (func, dependencies) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, dependencies);
  
}

export default useDidMountEffect;