type GeometryPatternProps = {
  variant: "halo" | "fold" | "balance";
  className?: string;
};

const lines = Array.from({ length: 23 }, (_, index) => index);

/** Decorative, resolution-independent linework in the surrounding text color. */
export function GeometryPattern({ variant, className = "" }: GeometryPatternProps) {
  return (
    <svg
      viewBox="0 0 520 520"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`h-auto w-full ${className}`}
    >
      {variant === "halo" && (
        <g>
          {Array.from({ length: 10 }, (_, index) => (
            <circle
              key={index}
              cx="260"
              cy="260"
              r={21 * (index + 1)}
              strokeWidth={3 - index * 0.18}
              opacity={0.9 * Math.pow(1 - index / 10, 1.3)}
            />
          ))}
        </g>
      )}

      {variant === "fold" && (
        <g>
          {lines.map((index) => {
            const inset = 84 + index * 5.8;

            return (
              <rect
                key={index}
                x={inset}
                y={inset}
                width={520 - inset * 2}
                height={520 - inset * 2}
                rx={35 - index * 1.1}
                transform={`rotate(${index * 3.4 - 32} 260 260)`}
                opacity={0.32 + (index / 22) * 0.56}
              />
            );
          })}
        </g>
      )}

      {variant === "balance" && (
        <g>
          {/* Three equal, connected forms reflect law, business and society. */}
          {[
            { x: 260, y: 184 },
            { x: 178, y: 326 },
            { x: 342, y: 326 },
          ].map(({ x, y }) => (
            <g key={`${x}-${y}`}>
              {[108, 120, 132, 144].map((radius, index) => (
                <circle
                  key={radius}
                  cx={x}
                  cy={y}
                  r={radius}
                  opacity={0.78 - index * 0.2}
                />
              ))}
            </g>
          ))}
        </g>
      )}

    </svg>
  );
}
