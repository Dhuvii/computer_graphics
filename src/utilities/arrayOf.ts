import isValid from "./isValid";

export default function arrayOf(
  numberOfElements: number,
  startFrom: number = 0,
  value?: number,
) {
  return Array.from({ length: numberOfElements }, (_, i) =>
    isValid(value) ? value : i + startFrom,
  );
}
