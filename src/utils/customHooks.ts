export const useSound = (src: string): HTMLAudioElement => {
  const mySound = require(`../assets/sounds/${src}`);
  return new Audio(mySound);
};
