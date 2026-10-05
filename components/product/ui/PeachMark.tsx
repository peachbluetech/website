/* PeachMark: the lowercase p, a circle (bowl) over a rounded rectangle
   (stem). Same geometry as the app's brand mark. It marks the logo square
   and the Ask Peach controls, never a loader or a generic icon. */
export function PeachMark({
  size = 24,
  color = "currentColor",
  className,
}: {
  /** Width and height in px. The app uses 18 in the logo square, 14 in the top bar, 12 and 13 inline. */
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx={18} cy={11} r={5} fill={color} />
      <rect x={10.5} y={17} width={3} height={11} rx={1.5} fill={color} />
    </svg>
  );
}
