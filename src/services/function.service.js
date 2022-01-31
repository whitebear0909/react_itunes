export const cutStr = (inputStr) => {
  return inputStr.length >= 60 ? inputStr.substr(0,60) + '...' : inputStr;
}