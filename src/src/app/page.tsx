export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1" />
      <footer className="w-full mt-6 pt-4 pb-4 border-t border-[rgba(47,58,86,0.14)]">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-1.5">
          <a
            href="https://maven.com/thecareerlab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#2F3A56] hover:text-[#243049] transition-colors"
          >
            <span className="underline underline-offset-2">Learn more about The Career Lab ↗</span>
          </a>
          <p className="text-[11px] text-black/40">
            © 2026 The Career Lab. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
