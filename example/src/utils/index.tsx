import { RefObject } from "react";

export const scrollToRef = async (
  ref: RefObject<HTMLDivElement>,
  cb?: () => void
) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
    cb && setTimeout(() => cb(), 1000);
  }
};
