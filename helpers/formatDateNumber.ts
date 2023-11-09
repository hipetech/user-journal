export function formatDateNumber(number: number) {
  const char = number.toString();
  if (char.length < 2) return 0 + char;
  return char;
}
