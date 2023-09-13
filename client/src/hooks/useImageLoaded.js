import { useEffect, useRef, useState } from 'react'

const useImageLoaded = () => {
  const ref = useRef();
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  }

  useEffect(() => {
    if(ref.current && ref.current.complete) {
      onLoad();
    }
  }, []);


  return {
    ref,
    onLoad,
    loaded,
  }
}

export default useImageLoaded;