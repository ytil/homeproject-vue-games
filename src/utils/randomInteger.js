export function randomInteger(min, max) {
  let randomNum = min + Math.random() * (max + 1 - min);
  randomNum = Math.floor(randomNum);
  return randomNum;
}