import React from "react";
import Link from "next/link";
import { ShieldCheck, Users, Lock, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full text-blue-600 mb-2">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            About Gate Pass Security Management
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive digital security system built to streamline visitor check-ins and employee gate pass authorizations.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
            <Users className="h-8 w-8 text-blue-600" />
            <h3 className="text-xl font-bold text-card-foreground">Visitor Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Register visitors, monitor check-in & check-out times in real-time with full history logs.
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
            <Lock className="h-8 w-8 text-blue-600" />
            <h3 className="text-xl font-bold text-card-foreground">Gate Pass Workflow</h3>
            <p className="text-sm text-muted-foreground">
              Issue, approve, and track employee entry and exit requests seamlessly across departments.
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
            <Clock className="h-8 w-8 text-blue-600" />
            <h3 className="text-xl font-bold text-card-foreground">Instant Verification</h3>
            <p className="text-sm text-muted-foreground">
              Eliminate paper logbooks with automated digital verification for gate security teams.
            </p>
          </div>
        </div>

        {/* Action CTA */}
        <div className="text-center pt-8">
          <Link href="/">
            <button className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-all">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
