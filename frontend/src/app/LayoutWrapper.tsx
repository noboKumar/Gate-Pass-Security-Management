"use client";

import React from "react";
import { usePathname } from "next/navigation";
import NavBar from "@/section/NavBar";
import Footer from "@/section/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isLogin = pathname?.startsWith("/login");
  const hideNavAndFooter = isDashboard || isLogin;

  return (
    <>
      {!hideNavAndFooter && <NavBar />}
      {children}
      {!hideNavAndFooter && <Footer />}
    </>
  );
}
