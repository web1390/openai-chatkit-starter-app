"use client";
import React, { ReactNode, ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message?: string;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: undefined };
  }

  static getDerivedStateFromError(error: unknown): State {
    let message = "Unknown error";
    if (error instanceof Error) message = error.message;
    else if (typeof error === "string") message = error;
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    console.error("App render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            direction: "rtl",
            padding: 16,
            border: "1px solid #f99",
            borderRadius: 8,
            margin: 16,
            color: "#222",
            background: "#fff",
          }}
        >
          <b>⚠️ خطا هنگام نمایش چت:</b>
          <div style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>
            {this.state.message}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
