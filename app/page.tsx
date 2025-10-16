"use client";

import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ErrorBoundary";
import DebugOverlay from "@/components/DebugOverlay";

// App را فقط در کلاینت لود کن تا SSR/Hydration دخالت نکند
const ClientApp = dynamic(() => import("./App"), { ssr: false });

export default function Home() {
  return (
    <>
      <ErrorBoundary>
        <ClientApp />
      </ErrorBoundary>
      <DebugOverlay />
    </>
  );
}
