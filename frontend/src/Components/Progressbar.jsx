"use client";

import { useCallback, useEffect, useState } from "react";

export const Progressbar = ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollListener = useCallback(() => {
    if (!target.current) {
      return;
    }

    const element = target.current;
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight;
    const windowScrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100);
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100);
  }, [target]);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, [scrollListener]);

  return (
    <div className="h-[300px] bg-[#252525] fixed rounded-full top-[40%] right-1 md:right-2 lg:right-14 pr-1 lg:pr-2">
      <div 
        className="w-1 lg:w-2 h-[50px] bg-[#12D8FA] rounded-full absolute top-0 right-0 transform translate-y-[-50%]" 
        style={{ top: `${readingProgress}%` }} 
      />
    </div>
  );
};