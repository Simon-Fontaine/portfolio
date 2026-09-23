/** Interpolate between section starts at the viewport's reading line. */
export function getScrollProgress(
  starts: number[],
  scroll: number,
  height: number,
  pageHeight: number,
) {
  if (!starts.length) return { active: 0, progress: 0 };
  if (scroll <= 1) return { active: 0, progress: 0 };
  if (scroll + height >= pageHeight - 2)
    return { active: starts.length - 1, progress: 1 };
  const marker = scroll + height * 0.25;
  let active = 0;
  for (let i = 0; i < starts.length; i++) if (marker >= starts[i]) active = i;
  const next = starts[active + 1];
  const fraction =
    next === undefined
      ? 0
      : Math.max(
          0,
          Math.min(
            1,
            (marker - starts[active]) / Math.max(1, next - starts[active]),
          ),
        );
  return {
    active,
    progress: starts.length < 2 ? 1 : (active + fraction) / (starts.length - 1),
  };
}
