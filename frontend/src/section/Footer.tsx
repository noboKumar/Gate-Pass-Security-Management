import React from "react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-container-margin py-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img
              alt="GateFlow Logo"
              className="h-8 w-8 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZbyCPpKj46X88IDf2Lt-2_BA_0h9KuBja2LzE-BRZBYusExoKgd5jCoWY-jPGUnhLezi-Y3MUFUU1hpLXXCAg48zpN_orcvN-q1N009fgyHxfMKsR3veZ3DNq3BkLF_gO7EEOjE3A3mynJ30MS09KlFezKGnQE6HQ6RZYQ2EuZRQpXgVYXKhoOm8OYlgwEYT1aHYgufm-1GHjBDT_WZhWrZr99JYV53_GXjBHjt06yBI-tFIebby"
            />
            <span className="text-body-lg font-bold text-on-surface">
              GateFlow
            </span>
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
            © 2024 GateFlow Systems. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
