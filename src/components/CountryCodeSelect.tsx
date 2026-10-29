"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES } from "@/lib/Countrycodes";

interface CountryCodeSelectProps {
  value: string; // ISO code, e.g. "IN"
  onChange: (iso: string) => void;
  disabled?: boolean;
}

function Flag({ iso }: { iso: string }) {
  const code = iso.toLowerCase();
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      width={22}
      height={16}
      alt=""
      loading="lazy"
      className="h-4 w-[22px] shrink-0 rounded-[2px] object-cover"
    />
  );
}

export default function CountryCodeSelect({
  value,
  onChange,
  disabled,
}: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selected = COUNTRIES.find((c) => c.iso === value) ?? COUNTRIES[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        c.dial.includes(q),
    );
  }, [query]);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const handleSelect = (iso: string) => {
    onChange(iso);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={wrapperRef} className="relative shrink-0">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code: ${selected.name} ${selected.dial}`}
        className="flex h-full min-h-[3rem] items-center gap-2 rounded-md border border-border bg-surface px-3 text-sm transition hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Flag iso={selected.iso} />
        <span className="font-medium">{selected.dial}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-lg border border-border bg-surface shadow-xl">
          <div className="border-b border-border p-2">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code…"
              aria-label="Search country"
              className="w-full rounded-md px-3 py-2 text-sm"
            />
          </div>

          <ul
            role="listbox"
            aria-label="Select country code"
            className="max-h-64 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-center text-sm opacity-60">
                No country found
              </li>
            ) : (
              filtered.map((c) => (
                <li
                  key={c.iso}
                  role="option"
                  aria-selected={c.iso === value}
                  onClick={() => handleSelect(c.iso)}
                  className={`flex cursor-pointer items-center gap-3 px-3 py-2 text-sm transition hover:bg-white/10 ${
                    c.iso === value ? "bg-white/10" : ""
                  }`}
                >
                  <Flag iso={c.iso} />
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="opacity-70">{c.dial}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
