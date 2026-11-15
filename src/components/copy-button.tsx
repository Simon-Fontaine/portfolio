"use client";

import { useEffect, useState } from "react";

/**
 * Copies a value to the clipboard. The label changes in place ("Copy address"
 * → "Copied") without resizing the button, and is announced to screen readers.
 */
export function CopyButton({
  value,
  label,
  copiedLabel,
}: {
  value: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      className="copy btn btn-secondary"
      data-copied={copied}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          // Clipboard unavailable: the address stays visible and selectable.
        }
      }}
    >
      <span data-label="idle">{label}</span>
      <span data-label="done" aria-hidden="true">
        {copiedLabel}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </button>
  );
}
