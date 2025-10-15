"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";

function Inner() {
  const [err, setErr] = useState<string | null>(null);

  const { control, events } = useChatKit({
    api: {
      // هم برای شروع و هم برای رفرش، یک سشن تازه می‌گیریم (MVP)
      async getClientSecret(current?: string) {
        const res = await fetch("/api/create-session", { method: "POST" });
        const data = await res.json();
        if (!res.ok || !data?.client_secret) {
          const msg = data?.error || "failed to fetch client_secret";
          setErr(msg);
          throw new Error(msg);
        }
        return data.client_secret as string;
      },
    },
    locale: "fa",
    rtl: true,
  });

  // اگر ویجت خطا داد، روی صفحه نشان بده—جلوگیری از سفید شدن خاموش
  useEffect(() => {
    const unsub = events.on("error", (e) => {
      console.error("ChatKit error:", e);
      setErr(typeof e === "string" ? e : e?.message || "Widget error");
    });
    return () => unsub();
  }, [events]);

  if (err) {
    return (
      <div style={{border:"1px solid #f99", padding:12, borderRadius:8, direction:"rtl"}}>
        <b>خطای ChatKit:</b> {String(err)}
      </div>
    );
  }

  return (
    <ChatKit
      control={control}
      style={{ height: 600, border: "1px solid #ddd", borderRadius: 12, padding: 8 }}
    />
  );
}

// فقط کلاینت؛ بدون SSR
export default dynamic(() => Promise.resolve(Inner), { ssr: false });
