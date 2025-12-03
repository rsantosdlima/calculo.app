"use client";

import { useEffect, useRef } from "react";

interface AdSenseProps {
  className?: string;
  style?: React.CSSProperties;
  slot: string; // The Ad Unit ID from Google AdSense
  format?: "auto" | "fluid" | "rectangle";
  responsive?: boolean;
  layoutKey?: string; // For In-feed ads
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense({
  className = "",
  style = {},
  slot,
  format = "auto",
  responsive = true,
  layoutKey,
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isProduction = process.env.NODE_ENV === "production";
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000";

  useEffect(() => {
    const element = adRef.current;
    if (!element) return;

    // Observer to wait for element to have dimensions
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Check if element has width (and is thus visible)
        if (entry.contentRect.width > 0) {
          try {
            // Only push if empty to avoid duplicates
            if (element.innerHTML === "") {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
            // Once we've attempted to push (or if it's already full), stop observing
            observer.disconnect();
          } catch (err) {
            console.error("AdSense Error:", err);
          }
        }
      }
    });

    observer.observe(element);

    // Cleanup
    return () => observer.disconnect();
  }, [slot]);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        ref={adRef}
        style={{ display: "block", ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
        data-ad-layout-key={layoutKey}
      ></ins>

      {!isProduction && (
        <div className="bg-gray-100 border border-gray-300 text-gray-400 text-xs p-2 text-center mt-1">
          AdSense Placeholder (Slot: {slot})
        </div>
      )}
    </div>
  );
}
