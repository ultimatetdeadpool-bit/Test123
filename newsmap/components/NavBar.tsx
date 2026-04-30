"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "News",     href: "/",         match: (p: string) => p === "/" || p.startsWith("/api") },
  { label: "Politics", href: "/politics", match: (p: string) => p.startsWith("/politics") },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-black border-b border-zinc-800 flex items-center select-none">

      {/* Logo */}
      <Link
        href="/"
        className="flex items-center h-full px-5 border-r border-zinc-800 shrink-0 gap-px hover:opacity-80 transition-opacity"
      >
        <span className="text-[15px] font-black tracking-tighter text-white leading-none">TEST</span>
        <span className="text-[15px] font-black tracking-tighter text-red-500 leading-none">123</span>
      </Link>

      {/* Nav tabs */}
      <nav className="flex items-center h-full">
        {NAV_LINKS.map(({ label, href, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={href}
              href={href}
              className={`relative h-full flex items-center px-5 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors ${
                active ? "text-white" : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {label}
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right — date stamp */}
      <div className="ml-auto px-5 hidden md:block">
        <span className="text-[10px] text-zinc-600 tracking-wide uppercase">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </span>
      </div>

    </header>
  );
}
