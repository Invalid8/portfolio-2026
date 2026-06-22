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
        <div style={{ display: "flex" }}>dalgoridim.com</div>
      </div>
    </div>
  );
}
