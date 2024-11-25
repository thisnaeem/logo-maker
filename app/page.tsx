import ClientOnly from "./components/ClientOnly";
import LogoMaker from "./components/LogoMaker";

export default function Home() {
  return (
    <div className="h-screen">
      <main className="h-full">
        <ClientOnly>
          <LogoMaker />
        </ClientOnly>
      </main>
    </div>
  );
}
