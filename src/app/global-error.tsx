"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            fontFamily: "system-ui, sans-serif",
            background: "#050510",
            color: "#e8e8f0",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Something went wrong</h2>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.5rem 1.5rem",
              borderRadius: "8px",
              background: "#6c63ff",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
