const POSITION_GAP = 1000;


export function computePosition(prev?: number | null, next?: number | null): number {
  if (prev == null && next == null) return POSITION_GAP;
  if (prev == null && next != null) return next - POSITION_GAP;
  if (prev != null && next == null) return prev + POSITION_GAP;
  return (prev! + next!) / 2;
}
