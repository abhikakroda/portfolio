export function triggerHaptic(duration = 8) {
  if (
    typeof navigator === "undefined" ||
    typeof navigator.vibrate !== "function"
  ) {
    return
  }

  navigator.vibrate(duration)
}
