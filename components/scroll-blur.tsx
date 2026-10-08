/** Progressive bottom blur matching the original Framer website. */
export function ScrollBlur() {
  return (
    <div className="scroll-blur" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => {
        const start = index * 12.5;
        const stops = [
          `transparent ${start}%`,
          `black ${start + 12.5}%`,
          ...(index < 7 ? [`black ${start + 25}%`] : []),
          ...(index < 6 ? [`transparent ${start + 37.5}%`] : []),
        ];
        const mask = `linear-gradient(to bottom, ${stops.join(", ")})`;
        const blur = `blur(${7 / 2 ** (7 - index)}px)`;
        return (
          <div
            key={index}
            style={{
              zIndex: index + 1,
              maskImage: mask,
              WebkitMaskImage: mask,
              backdropFilter: blur,
              WebkitBackdropFilter: blur,
            }}
          />
        );
      })}
    </div>
  );
}
