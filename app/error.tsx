"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // لاگ برای Vercel Logs
  console.error("Global render error:", error);

  return (
    <html>
      <body
        style={{
          direction: "rtl",
          padding: 16,
          border: "1px solid #f99",
          borderRadius: 8,
          margin: 16,
          color: "#222",
          background: "#fff",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, 'Vazirmatn', 'Noto Naskh Arabic', sans-serif",
        }}
      >
        <b>⚠️ خطا هنگام نمایش چت:</b>
        <div style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>
          {error?.message || "Unknown error"}
        </div>
        <button
          onClick={() => reset()}
          style={{
            marginTop: 12,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "#fafafa",
            cursor: "pointer",
          }}
        >
          تلاش مجدد
        </button>
      </body>
    </html>
  );
}
