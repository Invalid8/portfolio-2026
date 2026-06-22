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
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#09090b",
        color: "#f4f4f5",
        padding: "68px 76px",
        border: "1px solid #27272a",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
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

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
      {[24, 50, 76].map((left) => (
        <div
          key={left}
          style={{
            position: "absolute",
            insetBlock: 0,
            left: `${left}%`,
            width: 1,
            display: "flex",
            background: "rgba(255,255,255,0.035)",
          }}
        />
      ))}

      <div
        style={{
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
