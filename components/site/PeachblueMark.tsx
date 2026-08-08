export function PeachblueMark({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx={18} cy={11} r={5} fill={color} />
      <rect x={10.5} y={17} width={3} height={11} rx={1.5} fill={color} />
    </svg>
  );
}
