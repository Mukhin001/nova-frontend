export const getIsDesktop = (): boolean => {
  if (typeof window !== "undefined") {
    return window.innerWidth > 1100;
  }
  return true;
};
