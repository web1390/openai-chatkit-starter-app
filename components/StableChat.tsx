"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";

// ErrorBoundary ساده برای جلوگیری از صفحه سفید
class ChatErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message?: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, message: undefined };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, message: error?.message || String(error) };
  }
  componentDidCatch(error: any) {
    console.error("ChatKit render error:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{border:"1px solid #f99", padding:12, borderRadius:8, direction:"rtl"}}>
          <b>خطای ChatKit:</b> {this.state.message || "Unknown error"}
        </div>
      );
    }
    return this.props.children;
  }
}

function Inner() {
  const [err, setErr] = useState<string | null>(null);

  const { control } = useChatKit({
    api: {
      // سشن تازه برای شروع/رفرش (MVP)
      async getClientSecret() {
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

  if (err) {
    return (
      <div style={{border:"1px solid #f99", padding:12, borderRadius:8, direction:"rtl"}}>
        <b>خطای ChatKit:</b> {String(err)}
      </div>
    );
  }

  return (
    <ChatErrorBoundary>
      <ChatKit
        control={control}
        style={{ height: 600, border: "1px solid #ddd", borderRadius: 12, padding: 8 }}
      />
    </ChatErrorBoundary>
  );
}

// فقط کلاینت؛ بدون SSR
export default dynamic(() => Promise.resolve(Inner), { ssr: false });
