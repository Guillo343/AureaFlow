
export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white flex-col gap-4">
      <h1 className="text-4xl font-bold tracking-wide">AureaFlow</h1>
      <p className="opacity-80">Construyendo tu paz financiera...</p>

      {/* loader circle  */}
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
