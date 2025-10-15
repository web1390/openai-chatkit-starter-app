import StableChat from "@/components/StableChat";


export default function Home() {
  return (
    <main style={{maxWidth: 840, margin: "0 auto", padding: 24}}>
      <h1 style={{fontSize: 24, marginBottom: 12}}>وب‌چت WinSun Studio</h1>
      <StableChat />
    </main>
  );
}
