import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-container-margin py-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-blue-600 animate-pulse" />
              <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Gate Pass Management
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <a
              className="text-label-sm text-on-surface-variant hover:underline transition-all"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-label-sm text-on-surface-variant hover:underline transition-all"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-label-sm text-on-surface-variant hover:underline transition-all"
              href="#"
            >
              Support
            </a>
          </div>
          <div className="text-label-sm text-on-surface-variant">
            © {new Date().getFullYear()} GateFlow Systems. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
