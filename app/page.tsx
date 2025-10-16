"use client";

import dynamic from "next/dynamic";


// App استارتر را فقط در کلاینت لود کن تا SSR/Hydration دخالت نکند
const ClientApp = dynamic(() => import("./App"), { ssr: false });

export default function Home() {
  return (
    <>
      <ClientApp />  
    </>
  );
}
