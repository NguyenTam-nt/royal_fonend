import { useState, useEffect, useRef } from "react";

function useClickOutNer(intialState) {
  const [isShow, setShow] = useState(intialState);
  const ref = useRef(null);

  const handleShowItem = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setShow(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleShowItem, true);
    return () => {
      document.removeEventListener("click", handleShowItem, true);
    };
  }, [ref]);

  return { isShow, setShow, ref };
}

export default useClickOutNer;
