/**
 *
 * @param {string} text - The input text to be sliced.
 * @param {number} [length=50] - The maximum length of the sliced text. Default is 50.
 * @returns The sliced text with ellipsis if it exceeds the specified length.
 */
export function txtSlicer(text: string, length: number = 50) {
  if (text.length >= length) return `${text.slice(0, length)} ...`;
  return text;
}

export function numberWithCommas(x: string) {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
