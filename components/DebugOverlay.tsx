"use client";
import { useEffect, useState } from "react";

export default function DebugOverlay() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const onErr = (e: ErrorEvent) => setMsg(e?.error?.message || e.message || String(e));
    const onRej = (e: PromiseRejectionEvent) =>
      setMsg((e?.reason && (e.reason.message || String(e.reason))) || "Unhandled rejection");
    window.addEventListener("error", onErr);
    window.addEventListener("unhandledrejection", onRej);
    return () => {
      window.removeEventListener("error", onErr);
      window.removeEventListener("unhandledrejection", onRej);
    };
  }, []);

  if (!msg) return null;
  return (
    <div style={{position:"fixed",bottom:16,left:16,background:"#fff",border:"1px solid #f99",borderRadius:8,padding:12,zIndex:9999,direction:"rtl"}}>
      <b>خطای کلاینت:</b> <span style={{whiteSpace:"pre-wrap"}}>{msg}</span>
    </div>
  );
}
