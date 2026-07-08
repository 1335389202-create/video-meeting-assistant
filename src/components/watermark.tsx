'use client';

export function Watermark({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[60] overflow-hidden ${className ?? ''}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -30deg,
            transparent,
            transparent 80px,
            currentColor 80px,
            currentColor 81px
          )`,
        }}
      />
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="wm" x="0" y="0" width="320" height="180" patternUnits="userSpaceOnUse" patternTransform="rotate(-25)">
            <text x="10" y="90" fontSize="13" fill="currentColor" fontWeight="500" opacity="1">
              内部机密 - 张明远 - 2026
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wm)" />
      </svg>
    </div>
  );
}
