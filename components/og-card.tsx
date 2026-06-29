const tileColors = ["#0b0b0d", "#0c0c0e", "#0d0d0f", "#0e0e10", "#101012"];

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

const blockTiles = (() => {
  const random = seededRandom(20260229);
  const cells: { x: number; y: number }[] = [];

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 18; col += 1) {
      cells.push({ x: col * 70, y: row * 70 });
    }
  }

  for (let index = cells.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    const current = cells[index];
    const swap = cells[swapIndex];
    if (!current || !swap) continue;
    cells[index] = swap;
    cells[swapIndex] = current;
  }

  return cells.slice(0, 24).map((cell) => ({
    ...cell,
    color: tileColors[Math.floor(random() * tileColors.length)] ?? "#0d0d0f",
  }));
})();

function BlockBackground() {
  const verticalLines = Array.from({ length: 18 }, (_, i) => i * 70);
  const horizontalLines = Array.from({ length: 10 }, (_, i) => i * 70);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1200,
        height: 630,
        display: "flex",
        overflow: "hidden",
        background: "#09090b",
      }}
    >
      {verticalLines.map((left) => (
        <div
          key={`v-${left}`}
          style={{
            position: "absolute",
            top: 0,
            left,
            width: 1,
            height: "100%",
            display: "flex",
            background: "#101012",
          }}
        />
      ))}
      {horizontalLines.map((top) => (
        <div
          key={`h-${top}`}
          style={{
            position: "absolute",
            top,
            left: 0,
            width: "100%",
            height: 1,
            display: "flex",
            background: "#0f0f11",
          }}
        />
      ))}
      {blockTiles.map((tile, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: tile.x,
            top: tile.y,
            width: 70,
            height: 70,
            display: "flex",
            background: tile.color,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          display: "flex",
          background:
            "linear-gradient(90deg, rgba(9,9,11,0.08), rgba(9,9,11,0.02) 44%, rgba(9,9,11,0.2)), linear-gradient(180deg, rgba(9,9,11,0.08), rgba(9,9,11,0.22))",
        }}
      />
    </div>
  );
}

export function OgCard({
  eyebrow,
  title,
  description,
  tags = [],
}: {
  eyebrow: string;
  title: string;
  description: string;
  tags?: string[];
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        background: "#09090b",
        color: "#f4f4f5",
        padding: "68px 76px",
        border: "1px solid #27272a",
      }}
    >
      <BlockBackground />
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            width: 54,
            height: 4,
            display: "flex",
            background: "#c7ff5e",
          }}
        />
        <div
          style={{
            display: "flex",
            color: "#c7ff5e",
            fontSize: 23,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            maxWidth: 1040,
            fontSize: title.length > 55 ? 60 : 72,
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 940,
            color: "#a1a1aa",
            fontSize: 27,
            lineHeight: 1.35,
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#71717a",
          fontSize: 20,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {tags.slice(0, 4).map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                border: "1px solid #3f3f46",
                borderRadius: 999,
                padding: "8px 15px",
                color: "#d4d4d8",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div style={{ display: "flex" }}>
          {process.env.NEXT_PUBLIC_SITE_URL?.replace("https://", "") ??
            "dalgoridim.com"}
        </div>
      </div>
    </div>
  );
}

export function HomeOgCard() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        background: "#08080a",
        color: "#f4f4f5",
        padding: "58px 68px",
      }}
    >
      <BlockBackground />

      <div
        style={{
          position: "relative",
          display: "flex",
          color: "#a1a1aa",
          fontSize: 20,
          letterSpacing: "0.04em",
        }}
      >
        dalgoridim<span style={{ color: "#c7ff30" }}>.</span>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: 1040,
          fontSize: 76,
          lineHeight: 0.98,
          letterSpacing: "-0.045em",
          fontWeight: 600,
        }}
      >
        <div style={{ display: "flex" }}>Daniel builds</div>
        <div style={{ display: "flex" }}>
          accessible, fast&nbsp;<span style={{ color: "#8f8f98" }}>web</span>
        </div>
        <div style={{ display: "flex", color: "#8f8f98" }}>
          experiences people
        </div>
        <div style={{ display: "flex", color: "#8f8f98" }}>actually enjoy.</div>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: 999,
              background: "#c7ff30",
              color: "#101012",
              padding: "13px 24px",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Let&apos;s talk ↗
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2d2d32",
              borderRadius: 999,
              background: "#141416",
              padding: "13px 24px",
              fontSize: 18,
            }}
          >
            View work
          </div>
        </div>
        <div style={{ display: "flex", color: "#71717a", fontSize: 18 }}>
          Frontend developer · Lagos, Nigeria
        </div>
      </div>
    </div>
  );
}
