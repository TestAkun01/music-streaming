export default function formatSliderValue(
  currentTime: number,
  duration: number
): number {
  return (currentTime / duration) * 100;
}
