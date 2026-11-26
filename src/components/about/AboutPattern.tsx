type AboutPatternProps = {
  variant: "structure" | "rosette";
};

const facets = [
  [[260, 56], [440, 160], [260, 264], [80, 160]],
  [[80, 160], [260, 264], [260, 472], [80, 368]],
  [[260, 264], [440, 160], [440, 368], [260, 472]],
] as const;

// Six gently turning lobes create an engraved rosette within a circular outline.
function rosettePath(contour: number) {
  return Array.from({ length: 193 }, (_, index) => {
    const angle = (index / 192) * Math.PI * 2;
    const radius = 90 + contour * 7.5 + 17 * Math.cos(angle * 6 + contour * 0.17);
    const x = 260 + radius * Math.cos(angle);
    const y = 260 + radius * Math.sin(angle);

    return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ") + " Z";
}

/** About-page artwork: architectural strength and a shared, growing history. */
export function AboutPattern({ variant }: AboutPatternProps) {
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
      className="h-auto w-full"
    >
      {variant === "structure" && facets.map((vertices, face) => {
        const cx = vertices.reduce((sum, [x]) => sum + x, 0) / vertices.length;
        const cy = vertices.reduce((sum, [, y]) => sum + y, 0) / vertices.length;

        return (
          <g key={face}>
            {Array.from({ length: 13 }, (_, index) => {
              const scale = 1 - index * 0.063;

              return (
                <polygon
                  key={index}
                  points={vertices.map(([x, y]) => `${(cx + (x - cx) * scale).toFixed(2)},${(cy + (y - cy) * scale).toFixed(2)}`).join(" ")}
                  opacity={0.28 + (index / 12) * 0.52}
                />
              );
            })}
          </g>
        );
      })}

      {variant === "rosette" && (
        <g>
          <circle cx="260" cy="260" r="222" strokeWidth="1.1" opacity="0.18" />
          {Array.from({ length: 15 }, (_, index) => (
            <path
              key={index}
              d={rosettePath(index)}
              opacity={0.72 - index * 0.035}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
