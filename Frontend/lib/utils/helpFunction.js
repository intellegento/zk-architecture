export const convertNumber = number => `0${number}`.slice(-2)
export const zeroPad = (number, pad = 2) => String(number).padStart(pad, '0')
// export const loadImageFromAssets = path =>
//   path ? require(`../public/${path}`) : ''
