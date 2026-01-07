// export const getIsDesktop = (): boolean => {
//   if (typeof window !== "undefined") {
//     return window.innerWidth > 1100;
//   }
//   return true;
// };

export const getIsDesktop = (): boolean => {
  if (typeof window === "undefined") {
    return false; // безопасное значение по умолчанию
  }
  return window.innerWidth > 1100;
};
