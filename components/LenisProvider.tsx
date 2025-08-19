"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true, // automatically handles requestAnimationFrame
      smoothWheel: true, // enables smooth scrolling on mouse wheel
    });

    return () => {
      lenis.destroy(); // cleanup on unmount
    };
  }, []);

  return <>{children}</>;
}