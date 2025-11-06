export const getIsDesktop = (): boolean => {
  if (typeof window !== "undefined") {
    try {
      return window.innerWidth > 1100;
    } catch (err) {
      console.log("width window read error:", err);
    }
  }
  return true;
};
