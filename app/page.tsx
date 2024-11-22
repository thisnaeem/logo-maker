import LogoMaker from "./components/LogoMaker";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Logo Maker</h1>
      </header>
      
      <main className="h-[calc(100vh-64px)]">
        <LogoMaker />
      </main>
    </div>
  );
}
