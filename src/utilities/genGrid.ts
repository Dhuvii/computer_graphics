import arrayOf from "./arrayOf";

export default (row: number, col: number) => {
  let cols = arrayOf(col, 0, 0);
  let matrix = [];

  for (let i = 0; i < row; i++) {
    matrix[i] = cols;
  }

  return matrix;
};
