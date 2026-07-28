"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Menu, X } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex py-5 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Logo */}
        <div className="flex md:flex-1 items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl line-clamp-1">
              Gate Pass Security Management
            </span>
          </Link>
        </div>

        {/* Middle Side: Links (Desktop) */}
        <nav className="hidden md:flex items-center justify-center gap-6">
          <Link
            href="/"
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/contract"
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contract
          </Link>
        </nav>

        {/* Right Side: Login Button (Desktop) */}
        <div className="hidden md:flex md:flex-1 items-center justify-end">
          <Link href="/login">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Login
            </button>
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-border/40 bg-background/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-1 sm:px-6">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/contract"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            Contract
          </Link>
          <div className="pt-4 pb-2 border-t border-border/20">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
