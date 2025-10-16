"use client";
import React from "react";

export default class ErrorBoundary extends React.Component<
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
  componentDidCatch(error: any, info: any) {
    console.error("App render error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{direction:"rtl", padding:16, border:"1px solid #f99", borderRadius:8, margin:16}}>
          <b>⚠️ خطا هنگام نمایش چت:</b>
          <div style={{whiteSpace:"pre-wrap", marginTop:8}}>{this.state.message}</div>
        </div>
      );
    }
    return this.props.children;
  }
}
